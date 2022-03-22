const { db } = require("../../config/database");
const Fee = db.fee;
const { parseFeeConfiguration } = require('../helpers/feeConfigurationParser');
const { getTransactionFee } = require('../helpers/feeComputation');

async function createFeeConfiguration(req, res) {
  const { FeeConfigurationSpec } = req.body;
  try {
    const data = parseFeeConfiguration(FeeConfigurationSpec);
    await Fee.insertMany(data);

    res.status(201).send({
      status: "ok"
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
    });
  }
}

async function computeFee(req, res) {
  const { ID, Amount, Currency, CurrencyCountry, Customer, PaymentEntity } = req.body;
  try {
    const fee = await getTransactionFee(CurrencyCountry, PaymentEntity);

    if (!fee) {
      return res.status(400).send({
        Error: `No fee configuration for ${Currency} transactions.`
      });
    }

    let AppliedFeeValue;

    if (fee.type === "FLAT") {
      AppliedFeeValue = Number.parseInt(fee.value);
    } else if (fee.type === "PERC") {
      AppliedFeeValue = (Number.parseInt(fee.value) / 100) * Amount;
    } else {
      fee.value = fee.value.split(":");
      const flat = Number.parseInt(fee.value[0]);
      const perc = Number.parseFloat(fee.value[1]);

      AppliedFeeValue = Math.ceil(flat + perc / 100 * Amount);
    }

    const ChargeAmount = (Customer.BearsFee === true) ? Amount + AppliedFeeValue : Amount;

    return res.status(200).send({
      AppliedFeeID: fee.id || "",
      AppliedFeeValue,
      ChargeAmount,
      SettlementAmount: ChargeAmount - AppliedFeeValue
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
    });
  }
}

module.exports = {
  createFeeConfiguration,
  computeFee,
}