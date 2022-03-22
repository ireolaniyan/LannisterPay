const mongoose = require('mongoose')

const Schema = mongoose.Schema

const FeeSchema = new Schema({
  fee_id: String,
  fee_currency: String,
  fee_locale: String,
  fee_entity: String,
  entity_property: String,
  fee_type: String,
  fee_value: String,
});

const FeeModel = mongoose.model('Fee', FeeSchema);

module.exports = FeeModel;