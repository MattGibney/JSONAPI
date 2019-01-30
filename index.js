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
  if('relationships' in dataMapper) {
    outObject.relationships = {};
    Object.keys(dataMapper.relationships)
      .forEach(key => {
        let relationshipAttribute = outObject.relationships[key] = {};
        relationshipAttribute.data = {};
        if('id' in dataMapper.relationships[key]) {
          relationshipAttribute.data.id = object[dataMapper.relationships[key].id];
        }
        if('type' in dataMapper.relationships[key]) {
          relationshipAttribute.data.type = dataMapper.relationships[key].type;
        }
      });
  }
  return outObject;
};

let deserialiseObject = function(dataMapper, object) {
  let outObject = {};
  if('id' in dataMapper) {
    outObject[dataMapper.id] = object.id;
  }
  if('attributes' in dataMapper) {
    Object.keys(dataMapper.attributes).forEach(attr => {
      outObject[dataMapper.attributes[attr]] = object.attributes[attr];
    });
  }
  // if('relationships' in dataMapper) {
  //    
  // }
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
    return object.data.map(obj => {
      return deserialiseObject(dataMapper, obj);
    });
  }
  return deserialiseObject(dataMapper, object.data);
};