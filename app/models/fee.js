const mongoose = require('mongoose')

const Schema = mongoose.Schema

const FeeSchema = new Schema({
  fee_id: { type: String, unique: true },
  fee_currency: { type: String },
  fee_locale: { type: String },
  fee_entity: { type: String },
  entity_property: { type: String },
  fee_type: { type: String },
  fee_value: { type: String },
});

const FeeModel = mongoose.model('Fee', FeeSchema);

module.exports = FeeModel;