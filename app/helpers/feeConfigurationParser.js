function parseFeeConfiguration(configuration) {
  let specifications = configuration.split('\n');

  return specifications.map(spec => {
    let data = spec.replace('(', ' ');
    data = data.replace(')', '');
    data = data.split(' ');

    return {
      fee_id: data[0],
      fee_currency: data[1],
      fee_locale: data[2],
      fee_entity: data[3],
      entity_property: data[4],
      fee_type: data[7],
      fee_value: data[8]
    };
  });
}

module.exports = { parseFeeConfiguration };