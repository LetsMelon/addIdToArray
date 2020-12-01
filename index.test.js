/* eslint-disable array-callback-return */

/*!
 * addidtoarray <https://github.com/LetsMelon/addIdToArray>
 *
 * Copyright (c) 2020, Domenic
 * Released under the MIT License.
 */

const isEqual = require('lodash.isequal');

const addIdToArray = require('./index');

describe('arr', () => {
  it('Should return defined values', () => {
    expect(
      isEqual(addIdToArray({ name: 'Jeff', age: 19 }), [
        { id: 1, name: 'Jeff', age: 19 },
      ])
    ).toBe(true);

    expect(
      isEqual(
        addIdToArray([
          { name: 'Jeff', age: 19 },
          { name: 'Maria', age: 20 },
        ]),
        [
          { id: 1, name: 'Jeff', age: 19 },
          { id: 2, name: 'Maria', age: 20 },
        ]
      )
    ).toBe(true);

    // Issue: https://github.com/LetsMelon/addIdToArray/issues/7
    expect(isEqual(addIdToArray(undefined), [{ id: 1 }])).toBe(true);

    // Issue: https://github.com/LetsMelon/addIdToArray/issues/7
    expect(isEqual(addIdToArray([]), [])).toBe(true);
  });
});

describe('parameter', () => {
  describe('headers', () => {
    it('Should return defined values', () => {
      expect(
        isEqual(addIdToArray(['Jeff', 'Maria'], { headers: 'name' }), [
          { id: 1, name: 'Jeff' },
          { id: 2, name: 'Maria' },
        ])
      ).toBe(true);
      expect(
        isEqual(
          addIdToArray(
            [
              ['Jeff', 19],
              ['Maria', 20],
            ],
            { headers: ['name', 'age'] }
          ),
          [
            { id: 1, name: 'Jeff', age: 19 },
            { id: 2, name: 'Maria', age: 20 },
          ]
        )
      ).toBe(true);
    });
  });
  describe('start', () => {
    it('Should return defined values', () => {
      expect(
        isEqual(
          addIdToArray(
            [
              { name: 'Jeff', age: 19 },
              { name: 'Maria', age: 20 },
            ],
            { start: 10 }
          ),
          [
            { id: 10, name: 'Jeff', age: 19 },
            { id: 11, name: 'Maria', age: 20 },
          ]
        )
      ).toBe(true);
      expect(
        isEqual(
          addIdToArray(
            [
              { name: 'Jeff', age: 19 },
              { name: 'Maria', age: 20 },
            ],
            { start: '10' }
          ),
          [
            { id: 1, name: 'Jeff', age: 19 },
            { id: 2, name: 'Maria', age: 20 },
          ]
        )
      ).toBe(true);
      expect(
        isEqual(
          addIdToArray(
            [
              { name: 'Jeff', age: 19 },
              { name: 'Maria', age: 20 },
            ],
            { start: undefined }
          ),
          [
            { id: 1, name: 'Jeff', age: 19 },
            { id: 2, name: 'Maria', age: 20 },
          ]
        )
      ).toBe(true);
      expect(
        isEqual(
          addIdToArray(
            [
              { name: 'Jeff', age: 19 },
              { name: 'Maria', age: 20 },
            ],
            { start: -10 }
          ),
          [
            { id: 1, name: 'Jeff', age: 19 },
            { id: 2, name: 'Maria', age: 20 },
          ]
        )
      ).toBe(true);
    });
  });
  describe('incrementName', () => {
    it('Should return defined values', () => {
      expect(
        isEqual(
          addIdToArray({ name: 'Jeff', age: 19 }, { incrementName: undefined }),
          [{ id: 1, name: 'Jeff', age: 19 }]
        )
      ).toBe(true);
      expect(
        isEqual(
          addIdToArray({ name: 'Jeff', age: 19 }, { incrementName: 23 }),
          [{ id: 1, name: 'Jeff', age: 19 }]
        )
      ).toBe(true);
      expect(
        isEqual(
          addIdToArray({ name: 'Jeff', age: 19 }, { incrementName: 'nr' }),
          [{ nr: 1, name: 'Jeff', age: 19 }]
        )
      ).toBe(true);
      expect(
        isEqual(
          addIdToArray({ name: 'Jeff', age: 19 }, { incrementName: '' }),
          [{ id: 1, name: 'Jeff', age: 19 }]
        )
      ).toBe(true);
    });
  });
  describe('incrementStep', () => {
    it('Should return defined values', () => {
      expect(
        isEqual(
          addIdToArray(
            [
              { name: 'Jeff', age: 19 },
              { name: 'Maria', age: 20 },
            ],
            { incrementStep: undefined }
          ),
          [
            { id: 1, name: 'Jeff', age: 19 },
            { id: 2, name: 'Maria', age: 20 },
          ]
        )
      ).toBe(true);
      expect(
        isEqual(
          addIdToArray(
            [
              { name: 'Jeff', age: 19 },
              { name: 'Maria', age: 20 },
            ],
            { incrementStep: '2' }
          ),
          [
            { id: 1, name: 'Jeff', age: 19 },
            { id: 2, name: 'Maria', age: 20 },
          ]
        )
      ).toBe(true);
      expect(
        isEqual(
          addIdToArray(
            [
              { name: 'Jeff', age: 19 },
              { name: 'Maria', age: 20 },
            ],
            { incrementStep: 5 }
          ),
          [
            { id: 1, name: 'Jeff', age: 19 },
            { id: 6, name: 'Maria', age: 20 },
          ]
        )
      ).toBe(true);
    });
  });
  describe('customIdFunction', () => {
    it('Should return defined values', () => {
      expect(
        isEqual(
          addIdToArray(
            [
              { name: 'Jeff', age: 19 },
              { name: 'Maria', age: 20 },
            ],
            { customIdFunction: undefined }
          ),
          [
            { id: 1, name: 'Jeff', age: 19 },
            { id: 2, name: 'Maria', age: 20 },
          ]
        )
      ).toBe(true);
      expect(
        isEqual(
          addIdToArray(
            [
              { name: 'Jeff', age: 19 },
              { name: 'Maria', age: 20 },
            ],
            { customIdFunction: { id: 1 } }
          ),
          [
            { id: 1, name: 'Jeff', age: 19 },
            { id: 2, name: 'Maria', age: 20 },
          ]
        )
      ).toBe(true);
      expect(
        isEqual(
          addIdToArray(
            [
              { name: 'Jeff', age: 19 },
              { name: 'Maria', age: 20 },
            ],
            {
              // eslint-disable-next-line no-unused-vars
              customIdFunction: (item, params) => {
                return { id: 1 };
              },
            }
          ),
          [
            { id: 1, name: 'Jeff', age: 19 },
            { id: 1, name: 'Maria', age: 20 },
          ]
        )
      ).toBe(true);
      expect(
        isEqual(
          addIdToArray(
            [
              { name: 'Jeff', age: 19 },
              { name: 'Maria', age: 20 },
            ],
            {
              // eslint-disable-next-line no-unused-vars
              customIdFunction: (item, params) => {
                return params.currentNumber;
              },
            }
          ),
          [
            { id: 1, name: 'Jeff', age: 19 },
            { id: 2, name: 'Maria', age: 20 },
          ]
        )
      ).toBe(true);
    });
  });
});
