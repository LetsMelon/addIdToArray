/* eslint-disable array-callback-return */

/*!
 * addidtoarray <https://github.com/LetsMelon/addIdToArray>
 *
 * Copyright (c) 2020, Domenic
 * Released under the MIT License.
 */

const { isEqual } = require('@ngard/tiny-isequal');
const { isArray, isObject } = require('./lib/functions');

const f = require('./index');

describe('addIdToArray', () => {
  describe('arr', () => {
    describe('Array with single variables', () => {
      it('Should return an array with objects', () => {
        const result = f(['Dog', 'Cat'], { headers: ['animal'] });
        expect(isArray(result)).toBe(true);
        expect(result.length).toBe(2);
        expect(isObject(result[0])).toBe(true);
        expect(result[0].animal).toBeDefined();
      });
      it('Should return objects with id', () => {
        const result = f(['Dog', 'Cat'], ['animal']);
        expect(result[0].id).toBeDefined();
        expect(result[1].id).toBeDefined();
      });
      it('Should return objects with headers', () => {
        const result = f(['Dog', 'Cat'], { headers: ['animal'] });
        result.map((item) => {
          expect(item.id).toBeDefined();
          expect(typeof item.id).toBe('number');

          expect(item.animal).toBeDefined();
          expect(typeof item.animal).toBe('string');
        });
      });
      it('Should work with different datatypes', () => {
        // String:
        let result = f(['Dog', 'Cat'], { headers: 'animal' });
        expect(typeof result[0].animal).toBe('string');

        // Number:
        result = f([1234, 2345], { headers: ['people'] });
        expect(typeof result[0].people).toBe('number');

        // Boolean:
        result = f([true, false], { headers: ['test_passed'] });
        expect(typeof result[0].test_passed).toBe('boolean');

        // Object:
        // Disclaimer: just some random presidents from Europe. If this is a problem --> create a PR or an issue
        result = f(
          [
            { name: 'Alexander Van Der Bellen', country: 'Austria' },
            { name: 'Angela Merkel', country: 'Germany' },
          ],
          { headers: ['president'] }
        );
        expect(isObject(result[0].president)).toBe(true);

        // Array:
        // eslint-disable-next-line prettier/prettier
        result = f([[1, 2, 3, 4, 5], [2, 3, 4, 5, 6]],
          { headers: 'count' }
        );
        expect(isArray(result[0].count)).toBe(true);

        // Empty Object:
        // TODO Discuss if this should throw an error
        result = f([{}, {}]);
        expect(result.length).toBe(2);
        expect(result[0].id).toBeDefined();

        // Empty array
        // TODO Discuss if this should throw an error
        result = f([[], []]);
        expect(result.length).toBe(2);
        expect(result[0].id).toBeDefined();
      });
      describe('Should have a valid id', () => {
        it('Should begin to count at 1', () => {
          const result = f(['Dog', 'Cat'], { headers: ['animal'] });
          expect(result[0].id).toBe(1);
          expect(result[1].id).toBe(2);
        });
        it('Should have a always positive id', () => {
          const result = f(['Dog', 'Cat'], { headers: ['animal'], start: -2 });
          expect(result[0].id).toBe(1);
          expect(result[1].id).toBe(2);
        });
        it('Should have the give start as first id', () => {
          const result = f(['Dog', 'Cat'], { headers: ['animal'], start: 100 });
          expect(result[0].id).toBe(100);
          expect(result[1].id).toBe(101);
        });
      });
    });
    describe('Object with items', () => {
      it('Should return an array with objects', () => {
        const result = f([
          { name: 'Jeff', age: 19 },
          { name: 'Maria', age: 20 },
        ]);
        expect(isArray(result)).toBe(true);
        expect(result.length).toBe(2);
        expect(isObject(result[0])).toBe(true);
      });
      it('Should return objects with id', () => {
        const result = f([
          { name: 'Jeff', age: 19 },
          { name: 'Maria', age: 20 },
        ]);
        expect(result[0].id).toBeDefined();
        expect(typeof result[0].id).toBe('number');
        expect(result[1].id).toBeDefined();
        expect(typeof result[1].id).toBe('number');
      });
      it('Should work with different datatypes', () => {
        // String:
        let result = f([{ surname: 'Handlerson', name: 'Jeff' }]);
        expect(typeof result[0].surname).toBe('string');
        expect(typeof result[0].name).toBe('string');

        // Number:
        result = f([{ age: 22 }]);
        expect(typeof result[0].age).toBe('number');

        // Boolean:
        result = f([{ car_is_red: true }, { car_is_red: false }]);
        expect(typeof result[0].car_is_red).toBe('boolean');
        expect(typeof result[1].car_is_red).toBe('boolean');

        // Object:
        result = f([{ car: { color: 'red', 'max-miles-per-hour': 95 } }]);
        expect(isObject(result[0])).toBe(true);
        expect(result[0].car['max-miles-per-hour']).toBeDefined();

        // Nested-Object:
        result = f([
          {
            car: {
              color: 'red',
              driver: { name: 'Jeff', surname: 'Handlerson', age: 22 },
            },
          },
        ]);
        expect(isObject(result[0])).toBe(true);
        expect(isObject(result[0].car.driver)).toBe(true);

        // Array:
        result = f([{ 'lottery numbers': [23, 43, 12, 10, 30] }]);
        expect(isArray(result[0]['lottery numbers'])).toBe(true);
        expect(result[0]['lottery numbers'].length).toBe(5);
      });
      describe('Should have a valid id', () => {
        it('Should begin to count at 1', () => {
          const result = f([
            { name: 'Jeff', age: 19 },
            { name: 'Maria', age: 20 },
          ]);
          expect(result[0].id).toBe(1);
          expect(result[1].id).toBe(2);
        });
        it('Should have a always positive id', () => {
          const result = f(
            [
              { name: 'Jeff', age: 19 },
              { name: 'Maria', age: 20 },
            ],
            { incrementStep: -2 }
          );
          expect(result[0].id).toBe(1);
          expect(result[1].id).toBe(-1); // TODO discuss if this should be possible
        });
        it('Should have the give start as first id', () => {
          const result = f(
            [
              { name: 'Jeff', age: 19 },
              { name: 'Maria', age: 20 },
            ],
            { start: 100 }
          );
          expect(result[0].id).toBe(100);
          expect(result[1].id).toBe(101);
        });
      });
    });
    describe('Nested array', () => {
      it('Should return an array with objects', () => {
        const result = f(
          [
            ['Jeff', 19],
            ['Maria', 20],
          ],
          { headers: ['name', 'age'] }
        );
        expect(isArray(result)).toBe(true);
        expect(result.length).toBe(2);
        expect(isObject(result[0])).toBe(true);
        // eslint-disable-next-line prettier/prettier
        expect(isEqual(result[1],{ id: 2, name: 'Maria', age: 20 })).toBe(true);
        // TODO Check why this fails?
        // expect(result[1]).toBe({ id: 2, name: 'Maria', age: 20 });
      });
      it('Should return objects with id', () => {
        const result = f(
          [
            ['Jeff', 19],
            ['Maria', 20],
          ],
          ['name', 'age']
        );
        expect(result[0].id).toBeDefined();
        expect(typeof result[0].id).toBe('number');
        expect(result[1].id).toBeDefined();
        expect(typeof result[1].id).toBe('number');
      });
      it('Should return objects with headers', () => {
        const result = f(
          [
            ['Jeff', 19],
            ['Maria', 20],
          ],
          { headers: ['name', 'age'] }
        );
        result.map((item) => {
          expect(item.id).toBeDefined();
          expect(typeof item.id).toBe('number');

          expect(item.name).toBeDefined();
          expect(typeof item.name).toBe('string');

          expect(item.age).toBeDefined();
          expect(typeof item.age).toBe('number');
        });
      });
      it('Should work with different datatypes', () => {
        // String:
        let result = f(
          [
            ['Jeff', 19],
            ['Maria', 20],
          ],
          { headers: ['name', 'age'] }
        );
        expect(typeof result[0].name).toBe('string');

        // Number:
        result = f(
          [
            ['Jeff', 19],
            ['Maria', 20],
          ],
          { headers: ['name', 'age'] }
        );
        expect(typeof result[0].age).toBe('number');

        // Boolean:
        result = f([[true, false, false]], {
          headers: ['song_01', 'song_02', 'song_03'],
        });
        expect(typeof result[0].song_01).toBe('boolean');

        // Object:
        result = f(
          [
            [{ name: 'Jeff', age: 19 }, false],
            [{ name: 'Maria', age: 20 }, true],
          ],
          { headers: ['person', 'has a car?'] }
        );
        expect(isObject(result[0].person)).toBe(true);
        expect(result[1].person.name).toBe('Maria');
        expect(result[1].person.age).toBe(20);
        expect(result[1]['has a car?']).toBe(true);

        // Array:
        // Just some random cars!
        result = f([['Mercedes CLS 350d.', 'Tesla Model X']], {
          headers: ['jeff_cars'],
        });
        expect(isArray(result[0].jeff_cars)).toBe(true);
      });
      describe('Should have a valid id', () => {
        it('Should begin to count at 1', () => {
          const result = f(
            [
              ['Jeff', 19],
              ['Maria', 20],
            ],
            { headers: ['name', 'age'] }
          );
          expect(result[0].id).toBe(1);
          expect(result[1].id).toBe(2);
        });
        it('Should have a always positive id', () => {
          const result = f(
            [
              ['Jeff', 19],
              ['Maria', 20],
            ],
            { headers: ['name', 'age'], start: -2 }
          );
          expect(result[0].id).toBe(1);
          expect(result[1].id).toBe(2);
        });
        it('Should have the give start as first id', () => {
          const result = f(
            [
              ['Jeff', 19],
              ['Maria', 20],
            ],
            { headers: ['name', 'age'], start: 100 }
          );
          expect(result[0].id).toBe(100);
          expect(result[1].id).toBe(101);
        });
      });
    });
  });
  describe('parameter', () => {
    describe('headers', () => {
      it('Should have headers as array or a single string', () => {
        let result = f(['Dog', 'Cat'], { headers: ['animal'] });
        const result2 = f(['Dog', 'Cat'], { headers: 'animal' });
        const result3 = f([{ animal: 'Dog' }, { animal: 'Cat' }]);
        // eslint-disable-next-line prettier/prettier
        expect(isEqual(result, result2) && isEqual(result, result3)).toBe(true);
        // TODO Check why this fails?
        // expect(result).toBe(result2);
        // expect(result).toBe(result3);

        result = f(
          [
            ['Jeff', 19],
            ['Maria', 20],
          ],
          { headers: ['name', 'age'] }
        );
        expect(result[0].name).toBe('Jeff');
        expect(result[1].age).toBe(20);
      });
    });
    describe('start', () => {
      it('Should start to count at 1 on default', () => {
        const result = f({ name: 'Jeff', age: 19 }, { headers: 'person' });
        expect(result[0].id).toBe(1);
        expect(result[0].person.name).toBe('Jeff');
      });
      it('Should start to count at 1 on default if value is negative or undefined', () => {
        let result = f(
          { name: 'Jeff', age: 19 },
          { headers: 'person', start: -2 }
        );
        expect(result[0].id).toBe(1);

        result = f(
          { name: 'Jeff', age: 19 },
          { headers: 'person', start: undefined }
        );
        expect(result[0].id).toBe(1);
      });
      it('Should start to count on any (positive) number', () => {
        let result = f({ name: 'Jeff', age: 19 }, { start: 20 });
        expect(result[0].id).toBe(20);

        result = f({ name: 'Jeff', age: 19 }, { start: 189.75 });
        expect(result[0].id).toBe(189.75);
      });
      it('Should only take numbers to count', () => {
        let result = f(
          { name: 'Jeff', age: 19 },
          { headers: 'person', start: 'my special number' }
        );
        expect(result[0].id).toBe(1);

        result = f(
          { name: 'Jeff', age: 19 },
          { headers: 'person', start: { id: 1 } }
        );
        expect(result[0].id).toBe(1);
      });
    });
    describe('incrementName', () => {
      it('Should be "id" on default', () => {
        let result = f({ name: 'Jeff', age: 19 }, { headers: 'person' });
        expect(result[0].id).toBeDefined();

        result = f(
          { name: 'Jeff', age: 19 },
          { headers: 'person', incrementName: 'id' }
        );
        expect(result[0].id).toBeDefined();
      });
      it('Should be be a string with length > 0', () => {
        let result = f(
          { name: 'Jeff', age: 19 },
          { headers: 'person', incrementName: 'increment variable name' }
        );
        expect(result[0]['increment variable name']).toBeDefined();
        expect(result[0]['increment variable name']).toBe(1);

        result = f(
          { name: 'Jeff', age: 19 },
          { headers: 'person', incrementName: '' }
        );
        expect(result[0].id).toBeDefined();
        expect(result[0].id).toBe(1);
      });
      it('Should default to "id" if value is not a string', () => {
        const result = f(
          { name: 'Jeff', age: 19 },
          {
            headers: 'person',
            incrementName: { name: 'id' },
          }
        );
        expect(result[0].id).toBeDefined();
        expect(result[0][{ name: 'id' }.toString()]).not.toBeDefined();
      });
    });
    describe('incrementStep', () => {
      it('Should be 1 on default', () => {
        let result = f(
          [
            { name: 'Jeff', age: 19 },
            { name: 'Maria', age: 20 },
          ],
          { headers: 'person' }
        );
        expect(result[0].id).toBe(1);
        expect(result[1].id).toBe(2);

        result = f(
          [
            { name: 'Jeff', age: 19 },
            { name: 'Maria', age: 20 },
          ],
          { headers: 'person', incrementStep: undefined }
        );
        expect(result[0].id).toBe(1);
        expect(result[1].id).toBe(2);

        result = f(
          [
            { name: 'Jeff', age: 19 },
            { name: 'Maria', age: 20 },
          ],
          { headers: 'person', incrementStep: 1 }
        );
        expect(result[0].id).toBe(1);
        expect(result[1].id).toBe(2);
      });
      it('Should (de/in)crease the count any number', () => {
        let result = f(
          [
            { name: 'Jeff', age: 19 },
            { name: 'Maria', age: 20 },
          ],
          { headers: 'person', start: 20, incrementStep: 20 }
        );
        expect(result[0].id).toBe(20);
        expect(result[1].id).toBe(40);

        result = f(
          [
            { name: 'Jeff', age: 19 },
            { name: 'Maria', age: 20 },
          ],
          { headers: 'person', start: 189.75, incrementStep: 1.25 }
        );
        expect(result[0].id).toBe(189.75);
        expect(result[1].id).toBe(191);

        result = f(
          [{ name: 'Jeff', age: 19 }, { name: 'Maria', age: 20 }, {}, {}],
          { headers: 'person', start: 10, incrementStep: -5 }
        );
        expect(result[0].id).toBe(10);
        expect(result[1].id).toBe(5);
        expect(result[2].id).toBe(0);
        expect(result[3].id).toBe(-5); // TODO Discuss if this should throw an error becaude of < 0 and empty Object

        result = f(
          [
            { name: 'Jeff', age: 19 },
            { name: 'Maria', age: 20 },
          ],
          { headers: 'person', start: 20, incrementStep: '20' }
        );

        expect(result[0].id).toBe(20);
        expect(result[1].id).toBe(21);
      });
    });
    describe('customIdFunction', () => {
      const demoData = [
        { name: 'Jeff', age: 19 },
        { name: 'Maria', age: 20 },
      ];

      it('Should have a default function', () => {
        const result = f(demoData);
        expect(result[0].id).toBeDefined();
        expect(result[1].id).toBeDefined();

        expect(result[0].id).toBe(1);
        expect(result[1].id).toBe(2);
      });
      it('Should use given function', () => {
        let customFunction = (item, params) => {
          return { id: params.index };
        };

        let result = f(demoData, { customIdFunction: customFunction });
        expect(result[0].id).toBeDefined();
        expect(result[1].id).toBeDefined();

        expect(result[0].id).toBe(0);
        expect(result[1].id).toBe(1);

        customFunction = (item, params) => {
          return { id: params.index.toString() };
        };

        result = f(demoData, { customIdFunction: customFunction });
        expect(result[0].id).toBeDefined();
        expect(result[1].id).toBeDefined();

        expect(result[0].id).toBe('0');
        expect(result[1].id).toBe('1');
      });
      it('Should use default function if the passed is incorrect', () => {
        const customFunction = (item, params) => {
          return params.index;
        };

        const result = f(demoData, { customIdFunction: customFunction });
        expect(result[0].id).toBeDefined();
        expect(result[1].id).toBeDefined();

        expect(result[0].id).toBe(1);
        expect(result[1].id).toBe(2);
      });
    });
  });
});
