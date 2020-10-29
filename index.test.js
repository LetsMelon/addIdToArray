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
});
