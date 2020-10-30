const isArray = require('isarray');
const isObject = require('isobject');

const f = require('./index');

describe('addIdToArray', () => {
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
      result = f([{name: "Alexander Van Der Bellen", country: "Austria"}, {name: "Angela Merkel", country: "Germany"}],['president']);
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
