/*!
 * addidtoarray <https://github.com/LetsMelon/addIdToArray>
 *
 * Copyright (c) 2020, Domenic
 * Released under the MIT License.
 */

const isArray = Array.isArray;
const isObject = require('isobject');

/**
 * Add id parameter to object, array or single value
 * Go to the readme to see some examples.
 * 
 * Returns an array with objects. They have a field with a id.
 * Example: 
 *  arr = ['Peter',...];
 *  headers = 'name';
 *  --> returns: [{id: 1, name: 'Peter'}, ...]
 * 
 * @param {(Object[]|Object)} arr Raw data without id.
 * @param {(string[]|string)} headers How to call the properties of the object.
 * @param {number} [start=0]  start + 1 is the first id.
 * @param {string} [increment_name='id']  How the 'id' property is called.
 * @param {number} [increment_step=1] The increment step of the id.
 * 
 * @return {Object[]} Each entry has a parameter (see increment_name) with a id.
 */
module.exports = (arr, headers, start, increment_name, increment_step) => {
  arr = isArray(arr) ? arr : [arr];
  headers = headers === undefined ? [] : isArray(headers) ? headers : [headers];
  start = (start === undefined || typeof start !== 'number') ? 0 : start;
  increment_name = (increment_name === undefined || typeof increment_name !== 'string' || increment_name.length < 1) ? 'id' : increment_name;
  increment_step = (increment_step === undefined || typeof increment_step !== 'number') ? 1 : increment_step;

  let i = start - increment_step < 0 ? 0 : start - increment_step;
  return arr.map((item) => {
    i += increment_step;

    const idObj = {};
    idObj[increment_name] = i;

    if (isArray(headers) && headers.length === 1) {
      const head = headers[0].toString();
      const obj = {};
      obj[head] = item;
      return { ...idObj, ...obj };
    }

    if (isArray(item)) {
      let back = {};
      if (item.length === headers.length) {
        item.forEach((n, index) => {
          const obj = {};
          obj[headers[index].toString()] = n;
          back = {
            ...back,
            ...obj,
          };
        });
      }
      return { ...idObj, ...back };
    }

    if (isObject(item)) {
      return {
        ...idObj,
        ...item,
      };
    }

    return { ...idObj };
  });
};
