/* eslint-env mocha */
const assert = require('assert');
const jsonAPI = require('../index');

describe('Serialize', function() {
  it('Creates the basic structure for a single element', function() {
    const dataIn = {};
    const expectedOutput = {data: {}};

    assert.deepEqual(jsonAPI.serialise({}, dataIn), expectedOutput, 'Structure is correct');
  });
  it('Creates the basic structure for multiple elements', function() {
    const dataIn = [ {} ];
    const expectedOutput = {data: [ {} ]};

    assert.deepEqual(jsonAPI.serialise({}, dataIn), expectedOutput, 'Structure is correct');
  });

  describe('Maps Attributes', function() {
    it('Maps Single Objects', function() {
      const dataIn = {
        id: 999,
        title: 'This is a title'
      };
      const expectedOutput = {
        data: {
          id: 999,
          type: 'articles',
          attributes: {
            title: 'This is a title'
          }
        }
      };
      const mapperObject = {
        id: 'id',
        type: 'articles',
        attributes: {
          title: 'title'
        }
      };

      assert.deepEqual(jsonAPI.serialise(mapperObject, dataIn), expectedOutput, 'Structure is correct');
    });
    it('Maps Multiple Objects', function() {
      const dataIn = [
        {
          id: 999,
          title: 'This is a title'
        },
        {
          id: 111,
          title: 'This is another title'
        }
      ];
      const expectedOutput = {
        data: [
          {
            id: 999,
            type: 'articles',
            attributes: {
              title: 'This is a title'
            }
          },
          {
            id: 111,
            type: 'articles',
            attributes: {
              title: 'This is another title'
            }
          }
        ]
      };
      const mapperObject = {
        id: 'id',
        type: 'articles',
        attributes: {
          title: 'title'
        }
      };

      assert.deepEqual(jsonAPI.serialise(mapperObject, dataIn), expectedOutput, 'Structure is correct');
    });
  });
});

describe('Deserialize', function() {
  it('Understands an empty JSONAPI Object', function() {
    const dataIn = {data: {}};
    const expectedOutput = {};

    assert.deepEqual(jsonAPI.deserialise({}, dataIn), expectedOutput, 'Structure is correct');
  });
  it('Understands an empty JSONAPI Object array', function() {
    const dataIn = {data: [ {} ]};
    const expectedOutput = [ {} ];

    assert.deepEqual(jsonAPI.deserialise({}, dataIn), expectedOutput, 'Structure is correct');
  });

  describe('Maps Attributes', function() {
    it('Maps Single Objects', function() {
      const dataIn = {
        data: {
          id: 999,
          type: 'articles',
          attributes: {
            title: 'This is a title'
          }
        }
      };
      const expectedOutput = {
        id: 999,
        title: 'This is a title'
      };
      const mapperObject = {
        id: 'id',
        type: 'articles',
        attributes: {
          title: 'title'
        }
      };

      assert.deepEqual(jsonAPI.serialise(mapperObject, dataIn), expectedOutput, 'Structure is correct');
    });
    it('Maps Multiple Objects', function() {
      const dataIn = {
        data: [
          {
            id: 999,
            type: 'articles',
            attributes: {
              title: 'This is a title'
            }
          },
          {
            id: 111,
            type: 'articles',
            attributes: {
              title: 'This is another title'
            }
          }
        ]
      };
      const expectedOutput = [
        {
          id: 999,
          title: 'This is a title'
        },
        {
          id: 111,
          title: 'This is another title'
        }
      ];
      const mapperObject = {
        id: 'id',
        type: 'articles',
        attributes: {
          title: 'title'
        }
      };

      assert.deepEqual(jsonAPI.serialise(mapperObject, dataIn), expectedOutput, 'Structure is correct');
    });
  });
});
