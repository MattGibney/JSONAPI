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

        if(Array.isArray(dataMapper.relationships[key])){
          relationshipAttribute.data = [];
          const idpath = dataMapper.relationships[key][0].id.split('.');
          
          object[idpath[0]].forEach(obj => {
            let relationshipObject = {};
            if('id' in dataMapper.relationships[key][0]) {
              relationshipObject.id = obj[idpath[1]];
            }
            if('type' in dataMapper.relationships[key][0]) {
              relationshipObject.type = dataMapper.relationships[key][0].type;
            }
            relationshipAttribute.data.push(relationshipObject);
          });

        } else {
          relationshipAttribute.data = {}; 
          if('id' in dataMapper.relationships[key]) {
            relationshipAttribute.data.id = object[dataMapper.relationships[key].id];
          }
          if('type' in dataMapper.relationships[key]) {
            relationshipAttribute.data.type = dataMapper.relationships[key].type;
          }
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
  if('relationships' in dataMapper) {
    Object.keys(dataMapper.relationships)
      .forEach(key => {
        if(object.relationships[key]) {
          if(Array.isArray(dataMapper.relationships[key])){
            outObject[dataMapper.relationships[key][0].id.split('.')[0]] = [];
            object.relationships[key].data.forEach(obj => {
              let relationshipObject = {};
              relationshipObject[dataMapper.relationships[key][0].id.split('.')[1]] = obj.id;

              outObject[dataMapper.relationships[key][0].id.split('.')[0]]
                .push(relationshipObject);
            });
          } else {
            if('id' in dataMapper.relationships[key]) {
              outObject[dataMapper.relationships[key].id] = object.relationships[key].data.id;
            }
          }
        }
      });
  }
  return outObject;
};

exports.serialise = function(dataMapper, object, options = {}) {
  let output = null;
  if(Array.isArray(object)) {
    output = object.map(obj => serialiseObject(dataMapper, obj));
  } else {
    output = serialiseObject(dataMapper, object);
  }

  if(options.noData) {
    return output;
  }
  return {
    data: output
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