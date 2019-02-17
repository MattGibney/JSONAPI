/* eslint-env mocha */
const assert = require('assert');
const jsonAPI = require('../index');

describe('Serialize', function() {
  it('Creates the basic structure for a single element', function() {
    const dataIn = {};
    const expectedOutput = {data: {}};

    assert.deepEqual(
      jsonAPI.serialise({}, dataIn),
      expectedOutput,
      'Structure is correct'
    );
  });
  it('Respects option [noData]', function() {
    const dataIn = {};
    const expectedOutput = {};

    assert.deepEqual(
      jsonAPI.serialise({}, dataIn, { noData: true }),
      expectedOutput,
      'Structure is correct'
    );
  });
  it('Creates the basic structure for multiple elements', function() {
    const dataIn = [ {} ];
    const expectedOutput = {data: [ {} ]};

    assert.deepEqual(
      jsonAPI.serialise({}, dataIn),
      expectedOutput,
      'Structure is correct'
    );
  });

  describe('Maps Attributes', function() {
    it('Maps Single Object', function() {
      const dataIn = {
        idKey: 999,
        titleKey: 'This is a title'
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
        id: 'idKey',
        type: 'articles',
        attributes: {
          title: 'titleKey'
        }
      };

      assert.deepEqual(
        jsonAPI.serialise(mapperObject, dataIn),
        expectedOutput,
        'Structure is correct'
      );
    });
    it('Maps Multiple Objects', function() {
      const dataIn = [
        {
          idKey: 999,
          titleKey: 'This is a title'
        },
        {
          idKey: 111,
          titleKey: 'This is another title'
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
        id: 'idKey',
        type: 'articles',
        attributes: {
          title: 'titleKey'
        }
      };

      assert.deepEqual(
        jsonAPI.serialise(mapperObject, dataIn),
        expectedOutput,
        'Structure is correct'
      );
    });
  });

  // describe('Maps Relationships', function() {
  //   it('Maps single relationships', function() {
  //     const dataIn = {
  //       idKey: 222,
  //       authorId: 1,
  //     };
  //     const expectedOutput = {
  //       data: {
  //         id: 222,
  //         type: 'articles',
  //         relationships: {
  //           author: {
  //             data: { type: 'author', id: 1 }
  //           }
  //         }
  //       }
  //     };
  //     const mapperObject = {
  //       id: 'idKey',
  //       type: 'articles',
  //       relationships: {
  //         author: {
  //           type: 'author',
  //           id: 'authorId'
  //         }
  //       }
  //     };

  //     assert.deepEqual(
  //       jsonAPI.serialise(mapperObject, dataIn),
  //       expectedOutput,
  //       'Single relationship mapped'
  //     );
  //   });
  // });
});
