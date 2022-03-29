const { db } = require("../../config/database");
const Fee = db.fee;

function queryBuilder(currencyCountry, paymentEntity) {
  let query = {};

  if (currencyCountry === "NG" && paymentEntity.Country === "NG") {
    query.fee_locale = { $in: ["LOCL", "*"] };
  } else {
    query.fee_locale = { $in: ["INTL", "*"] };
  }

  query.fee_entity = { $in: [paymentEntity.Type, "*"] };

  if (paymentEntity.Type === "CREDIT_CARD" || paymentEntity.Type === "DEBIT_CARD") {
    query.entity_property = { $in: [paymentEntity.Brand, paymentEntity.Number, paymentEntity.SixID, "*"] };
  } else {
    query.entity_property = { $in: [paymentEntity.Number, paymentEntity.SixID, paymentEntity.Issuer, "*"] };
  }

  return query;
}

async function getTransactionFee(currencyCountry, paymentEntity) {
  const query = queryBuilder(currencyCountry, paymentEntity);

  const applicableRules = await Fee.find(query);

  if (applicableRules.length < 1) {
    return null;
  }

  const ruleScore = applicableRules.map(rule => {
    let score = 3;

    if (rule.fee_entity === "*") score--;
    if (rule.fee_locale === "*") score--;
    if (rule.entity_property === "*") score--;

    return score;
  });

  const index = ruleScore.indexOf(Math.max(...ruleScore));

  const id = applicableRules[index].fee_id;
  const type = applicableRules[index].fee_type;
  const value = applicableRules[index].fee_value;

  return { id, type, value };
}

module.exports = {
  getTransactionFee,
}