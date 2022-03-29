const mongoose = require('mongoose')

const Schema = mongoose.Schema

const FeeSchema = new Schema({
  fee_id: { type: String, unique: true },
  fee_currency: { type: String },
  fee_locale: { type: String, index: true },
  fee_entity: { type: String, index: true },
  entity_property: { type: String, index: true },
  fee_type: { type: String },
  fee_value: { type: String },
});

FeeSchema.index(
  {
    fee_locale: 1,
    fee_entity: 1,
    entity_property: 1
  }
);

const FeeModel = mongoose.model('Fee', FeeSchema);

module.exports = FeeModel;