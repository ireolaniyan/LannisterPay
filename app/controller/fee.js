const { db } = require("../../config/database");
const Fee = db.fee;
const { parseFeeConfiguration } = require('../helpers/feeConfigurationParser');

async function createFeeConfiguration(req, res) {
  const { FeeConfigurationSpec } = req.body;
  try {
    const data = parseFeeConfiguration(FeeConfigurationSpec);
    await Fee.insertMany(data);

    res.status(201).send({
      status: "ok"
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
			success: false,
			error,
		});
  }
}

module.exports = {
  createFeeConfiguration,
}