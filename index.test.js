/*!
 * addidtoarray <https://github.com/LetsMelon/addIdToArray>
 *
 * Copyright (c) 2020, Domenic
 * Released under the MIT License.
 */

const isArray = Array.isArray;
const isObject = require('isobject');
const _ = require('lodash');

const f = require('./index');

describe('addIdToArray', () => {
  describe('Parameter: arr', () => {
    describe('Array with single variables', () => {
      it('Should return an array with objects', () => {
        const result = f(['Dog', 'Cat'],['animal']);
        expect(isArray(result)).toBe(true);
        expect(result.length).toBe(2);
        expect(isObject(result[0])).toBe(true);
      });
      it('Should return objects with id', () => {
        const result = f(['Dog', 'Cat'],['animal']);
        expect(result[0].id).toBeDefined();
        expect(result[1].id).toBeDefined();
      });
      it('Should return objects with headers', () => {
        const result = f(['Dog', 'Cat'],['animal']);
        result.map((item) => {
          expect(item.id).toBeDefined();
          expect(typeof item.id).toBe('number');
  
          expect(item.animal).toBeDefined();
          expect(typeof item.animal).toBe('string');
        });
      });
      it('Should work with different datatypes', () => {
        // String:
        let result = f(['Dog', 'Cat'],['animal']);
        expect(typeof result[0].animal).toBe('string');
  
        // Number:
        result = f([1234, 2345],['people']);
        expect(typeof result[0].people).toBe('number');
  
        // Boolean:
        result = f([true, false],['test_passed']);
        expect(typeof result[0].test_passed).toBe('boolean');
  
        // Object:
        // Disclaimer: just some random presidents from Europe. If this is a problem --> create a PR or an issue
        result = f([{name: 'Alexander Van Der Bellen', country: 'Austria'}, {name: 'Angela Merkel', country: 'Germany'}],['president']);
        expect(isObject(result[0].president)).toBe(true);
  
        // Array:
        result = f([[1,2,3,4,5], [2,3,4,5,6]],['count']);
        expect(isArray(result[0].count)).toBe(true);
      });
      describe('Should have a valid id', () => {
        it('Should begin to count at 1', () => {
          const result = f(['Dog', 'Cat'],['animal']);
          expect(result[0].id).toBe(1);
          expect(result[1].id).toBe(2);
        });
        it('Should have a always positive id', () => {
          const result = f(['Dog', 'Cat'],['animal'], -2);
          expect(result[0].id).toBe(1);
          expect(result[1].id).toBe(2);
        });
        it('Should have the give start as first id', () => {
          const result = f(['Dog', 'Cat'],['animal'], 100);
          expect(result[0].id).toBe(100);
          expect(result[1].id).toBe(101);
        });
      });
    });
    describe('Object with items', () => {
      it('Should return an array with objects', () => {
        const result = f([{name: 'Jeff', age: 19}, {name: 'Maria', age: 20}]);      
        expect(isArray(result)).toBe(true);
        expect(result.length).toBe(2);
        expect(isObject(result[0])).toBe(true);
      });
      it('Should return objects with id', () => {
        const result = f([{name: 'Jeff', age: 19}, {name: 'Maria', age: 20}]);
        expect(result[0].id).toBeDefined();
        expect(typeof result[0].id).toBe('number');
        expect(result[1].id).toBeDefined();
        expect(typeof result[1].id).toBe('number');
      });
      it('Should work with different datatypes', () => {
        // String:
        let result = f([{surname: 'Handlerson', name: 'Jeff'}]);
        expect(typeof result[0].surname).toBe('string');
        expect(typeof result[0].name).toBe('string');
  
        // Number:
        result = f([{age: 22}]);
        expect(typeof result[0].age).toBe('number');
  
        // Boolean:
        result = f([{car_is_red: true}, {car_is_red: false}]);
        expect(typeof result[0].car_is_red).toBe('boolean');
        expect(typeof result[1].car_is_red).toBe('boolean');
  
        // Object:
        result = f([{car: {color: 'red', 'max-miles-per-hour': 95}}]);
        expect(isObject(result[0])).toBe(true);
        expect(result[0].car['max-miles-per-hour']).toBeDefined();
  
        // Nested-Object:
        result = f([{car: {color: 'red', driver: {name: 'Jeff', surname: 'Handlerson', age: 22}}}]);
        expect(isObject(result[0])).toBe(true);
        expect(isObject(result[0].car.driver)).toBe(true);
        
        // Array:
        result = f([{'lottery numbers': [23, 43, 12, 10, 30]}]);
        expect(isArray(result[0]['lottery numbers'])).toBe(true);
        expect(result[0]['lottery numbers'].length).toBe(5);
      });
      describe('Should have a valid id', () => {
        it('Should begin to count at 1', () => {
          const result = f([{name: 'Jeff', age: 19}, {name: 'Maria', age: 20}]);
          expect(result[0].id).toBe(1);
          expect(result[1].id).toBe(2);
        });
        it('Should have a always positive id', () => {
          const result = f([{name: 'Jeff', age: 19}, {name: 'Maria', age: 20}], [], -2);
          expect(result[0].id).toBe(1);
          expect(result[1].id).toBe(2);
        });
        it('Should have the give start as first id', () => {
          const result = f([{name: 'Jeff', age: 19}, {name: 'Maria', age: 20}], [], 100);
          expect(result[0].id).toBe(100);
          expect(result[1].id).toBe(101);
        });
      });
    });
    describe('Nested array', () => {
      it('Should return an array with objects', () => {
        const result = f([['Jeff', 19], ['Maria', 20]], ['name', 'age']);
        expect(isArray(result)).toBe(true);
        expect(result.length).toBe(2);
        expect(isObject(result[0])).toBe(true);
      });
      it('Should return objects with id', () => {
        const result = f([['Jeff', 19], ['Maria', 20]], ['name', 'age']);
        expect(result[0].id).toBeDefined();
        expect(typeof result[0].id).toBe('number');
        expect(result[1].id).toBeDefined();
        expect(typeof result[1].id).toBe('number');
      });
      it('Should return objects with headers', () => {
        const result = f([['Jeff', 19], ['Maria', 20]], ['name', 'age']);
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
        let result = f([['Jeff', 19], ['Maria', 20]], ['name', 'age']);
        expect(typeof result[0].name).toBe('string');
  
        // Number:
        result = f([['Jeff', 19], ['Maria', 20]], ['name', 'age']);
        expect(typeof result[0].age).toBe('number');
  
        // Boolean:
        result = f([[true, false, false]], ['song_01', 'song_02', 'song_03']);
        expect(typeof result[0].song_01).toBe('boolean');
  
        // Object:
        result = f([[{name: 'Jeff', age: 19}, false], [{name: 'Maria', age: 20}, true]], ['person', 'has a car?']);
        expect(isObject(result[0].person)).toBe(true);
        expect(result[1].person.name).toBe('Maria');
        expect(result[1].person.age).toBe(20);
        expect(result[1]['has a car?']).toBe(true);
  
        // Array:
        // Just some random cars!
        result = f([['Mercedes CLS 350d.', 'Tesla Model X']], ['jeff_cars']);
        expect(isArray(result[0].jeff_cars)).toBe(true);
      });
      describe('Should have a valid id', () => {
        it('Should begin to count at 1', () => {
          const result = f([['Jeff', 19], ['Maria', 20]], ['name', 'age']);
          expect(result[0].id).toBe(1);
          expect(result[1].id).toBe(2);
        });
        it('Should have a always positive id', () => {
          const result = f([['Jeff', 19], ['Maria', 20]], ['name', 'age'], -2);
          expect(result[0].id).toBe(1);
          expect(result[1].id).toBe(2);
        });
        it('Should have the give start as first id', () => {
          const result = f([['Jeff', 19], ['Maria', 20]], ['name', 'age'], 100);
          expect(result[0].id).toBe(100);
          expect(result[1].id).toBe(101);
        });
      });
    });
  });
  describe('Parameter: headers', () => {
    it('Should have headers as array or a single string', () => {
      let result = f(['Dog', 'Cat'],['animal']);
      const result2 = f(['Dog', 'Cat'],'animal');
      expect(_.isEqual(result, result2)).toBe(true);

      result = f([['Jeff', 19], ['Maria', 20]], ['name', 'age']);
      expect(result[0].name).toBe('Jeff');
      expect(result[1].age).toBe(20);
    })
  });
  describe('Parameter: start', () => {
    it('Should start to count at 1 on default', () => {
      let result = f({name: 'Jeff', age: 19},'person');
      expect(result[0].id).toBe(1);

      result = f({name: 'Jeff', age: 19},'person', 1);
      expect(result[0].id).toBe(1);
    });
    it('Should start to count at 1 on default if value is negative or undefined', () => {
      let result = f({name: 'Jeff', age: 19},'person', -2);
      expect(result[0].id).toBe(1);

      result = f({name: 'Jeff', age: 19},'person', undefined);
      expect(result[0].id).toBe(1);
    });
    it('Should start to count on any (positive) number', () => {
      let result = f({name: 'Jeff', age: 19},'person', 20);
      expect(result[0].id).toBe(20);

      result = f({name: 'Jeff', age: 19},'person', 189.75);
      expect(result[0].id).toBe(189.75);
    });
    it('Should only take numbers to count', () => {
      let result = f({name: 'Jeff', age: 19},'person', 'my special number');
      expect(result[0].id).toBe(1);

      result = f({name: 'Jeff', age: 19},'person', {id: 1});
      expect(result[0].id).toBe(1);
    });
  });
  describe('Parameter: increment_name', () => {
    it('Should be "id" on default', () => {
      let result = f({name: 'Jeff', age: 19},'person');
      expect(result[0].id).toBeDefined();

      result = f({name: 'Jeff', age: 19},'person', undefined, 'id');
      expect(result[0].id).toBeDefined();
    });
    it('Should be be a string with length > 0', () => {
      let result = f({name: 'Jeff', age: 19},'person', undefined, 'increment variable name');
      expect(result[0]['increment variable name']).toBeDefined();

      result = f({name: 'Jeff', age: 19},'person', undefined, '');
      expect(result[0].id).toBeDefined();
    });
    it('Should default to "id" if value is not a string', () => {
      let result = f({name: 'Jeff', age: 19},'person', undefined, {name: 'id'});
      expect(result[0].id).toBeDefined();
      expect(result[0][{name: 'id'}.toString()]).not.toBeDefined();

      result = f({name: 'Jeff', age: 19},'person', undefined, undefined);
      expect(result[0].id).toBeDefined();
    });
  });
  describe('Parameter: increment_step', () => {
    it('Should be 1 on default', () => {
      let result = f([{name: 'Jeff', age: 19}, {name: 'Maria', age: 20}],'person');
      expect(result[0].id).toBe(1);
      expect(result[1].id).toBe(2);

      result = f([{name: 'Jeff', age: 19}, {name: 'Maria', age: 20}],'person', undefined, undefined, undefined);
      expect(result[0].id).toBe(1);
      expect(result[1].id).toBe(2);

      result = f([{name: 'Jeff', age: 19}, {name: 'Maria', age: 20}],'person', undefined, undefined, 1);
      expect(result[0].id).toBe(1);
      expect(result[1].id).toBe(2);
    });
    it('Should (de/in)crease the count any number', () => {
      let result = f([{name: 'Jeff', age: 19}, {name: 'Maria', age: 20}],'person', 20, undefined, 20);
      expect(result[0].id).toBe(20);
      expect(result[1].id).toBe(40);

      result = result = f([{name: 'Jeff', age: 19}, {name: 'Maria', age: 20}],'person', 189.75, undefined, 1.25);
      expect(result[0].id).toBe(189.75);
      expect(result[1].id).toBe(191);

      result = result = f([{name: 'Jeff', age: 19}, {name: 'Maria', age: 20}, {}, {}],'person', 10, undefined, -5);
      expect(result[0].id).toBe(10);
      expect(result[1].id).toBe(5);
      expect(result[2].id).toBe(0);
      expect(result[3].id).toBe(-5); // TODO think if this should throw an error

      result = f([{name: 'Jeff', age: 19}, {name: 'Maria', age: 20}],'person', 20, undefined, "20");
      expect(result[0].id).toBe(20);
      expect(result[1].id).toBe(21);
    });
  });
});
