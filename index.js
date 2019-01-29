let serialiseObject = function(dataMapper, object) {
  let outObject = {};
  if('id' in dataMapper) {
    outObject.id = object[dataMapper.id];
  }
  if('type' in dataMapper) {
    outObject.type = dataMapper.type;
  }

  if('attributes' in dataMapper && Object.keys(dataMapper.attributes).length > 0) {
    outObject.attributes = {};
    Object.keys(dataMapper.attributes)
      .forEach(key => {
        outObject.attributes[key] = object[dataMapper.attributes[key]];
      });
  }
  return outObject;
};

let deserialiseObject = function(dataMapper, object) {
  let outObject = {};
  if('id' in dataMapper) {
    outObject.id = object.id;
  }
  if('attributes' in dataMapper) {
    dataMapper.attributes.forEach(attr => {
      outObject[attr] = object.attributes[attr];
    });
  }

  return outObject;
};

exports.serialise = function(dataMapper, object) {
  if(Array.isArray(object)) {
    return {
      data: object.map(obj => serialiseObject(dataMapper, obj))
    };
  }
  return {
    data: serialiseObject(dataMapper, object)
  };
};

exports.deserialise = function(dataMapper, object) {
  if(Array.isArray(object.data)) {
    return object.data.map(obj => deserialiseObject(dataMapper, obj));
  }
  return deserialiseObject(dataMapper, object.data);
};