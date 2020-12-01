const isEqual = require('lodash.isequal');
const f = require('./functions');

describe('lib/functions', () => {
  it('isArray', () => {
    expect(f.isArray([])).toBe(true);
    expect(f.isArray({})).toBe(false);
    expect(f.isArray(undefined)).toBe(false);

    expect(f.isArray(['Jeff', 19])).toBe(true);
    expect(f.isArray({ name: 'Jeff', age: 19 })).toBe(false);
    expect(f.isArray('Jeff')).toBe(false);
  });
  it('isObject', () => {
    expect(f.isObject([])).toBe(true);
    expect(f.isObject({})).toBe(true);
    expect(f.isObject(undefined)).toBe(false);

    expect(f.isObject(['Jeff', 19])).toBe(true);
    expect(f.isObject({ name: 'Jeff', age: 19 })).toBe(true);
    expect(f.isObject('Jeff')).toBe(false);
  });
  it('mergeObject', () => {
    expect(
      isEqual(f.mergeObject({ id: 1 }, { name: 'Jeff' }), {
        id: 1,
        name: 'Jeff',
      })
    ).toBe(true);
    expect(isEqual(f.mergeObject({ id: 1 }, {}), { id: 1 })).toBe(true);
    expect(isEqual(f.mergeObject({}, { id: 1 }), { id: 1 })).toBe(true);
    expect(isEqual(f.mergeObject({ id: 1 }, undefined), { id: 1 })).toBe(true);
  });
});
