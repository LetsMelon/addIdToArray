/*!
 * addidtoarray <https://github.com/LetsMelon/addIdToArray>
 *
 * Copyright (c) 2020, Domenic
 * Released under the MIT License.
 */

const { isArray, isObject } = require('./lib/functions');

/**
 * Default function to generate the id value.
 *
 * @param {*} item Is the current item at the index in arr. Passed from the main function.
 * @param {Object} params Parameters passed from the main function. Always defined!
 * @param {Number} params.current_number params.start + params.index * params.incrementStep
 * @param {Number} params.index Current index in 'arr' from main function
 * @param {String} params.incrementName 'incrementName' passed to main function or default value
 * @param {Number} params.incrementStep 'incrementStep' passed to main function or default value
 * @param {Number} params.start 'start' passed to main function or default value
 *
 * @returns {Object}
 */
const defaultId = (item, params) => {
  const back = {};
  back[params.incrementName] = params.currentNumber;
  return back;
};

/**
 * Add id parameter to object, array or single value
 * Go to the readme to see some examples.
 *
 * Returns an array with objects. They have a field with a id.
 * Example:
 *  arr = ['Peter',...];
 *  parameter: headers = 'name';
 *  --> returns: [{id: 1, name: 'Peter'}, ...]
 *
 * @param {(Object[]|Object)} arr Raw data without id.
 * @param {Object} parameter Optional parameters!
 * @param {(string[]|string)} parameter.headers How to call the properties of the object.
 * @param {number} [parameter.start=0]  start + 1 is the first id.
 * @param {string} [parameter.incrementName='id']  How the 'id' property is called.
 * @param {number} [parameter.incrementStep=1] The increment step of the id.
 * @param {function} [parameter.customIdFunction=defaultId] Set a function to generate the id. More in README.md
 *
 * @returns {Object[]} Each entry has a parameter (see incrementName) with a id.
 */
module.exports = (arr, parameter) => {
  let { headers, start, incrementName, incrementStep, customIdFunction } =
    parameter || {};

  // eslint-disable-next-line no-param-reassign
  arr = isArray(arr) ? arr : [arr];
  /* eslint-disable prettier/prettier, no-nested-ternary */
  headers = headers === undefined ? [] : isArray(headers) ? headers : [headers];
  start = (start === undefined || typeof start !== 'number' || start < 0) ? 1 : start;
  incrementName = (incrementName === undefined || typeof incrementName !== 'string' || incrementName.length < 1) ? 'id' : incrementName;
  incrementStep = (incrementStep === undefined || typeof incrementStep !== 'number') ? 1 : incrementStep;
  customIdFunction = (customIdFunction === undefined || typeof customIdFunction !== 'function') ? defaultId : customIdFunction;
  /* eslint-enable prettier/prettier, no-nested-ternary */

  return arr.map((item, index) => {
    const params = {
      currentNumber: start + index * incrementStep,
      index,
      incrementName,
      incrementStep,
      start,
    };
    let idObj = customIdFunction(item, params);
    if (!isObject(idObj)) idObj = defaultId(item, params);

    if (isArray(headers) && headers.length === 1) {
      const head = headers[0].toString();
      const obj = {};
      obj[head] = item;
      return { ...idObj, ...obj };
    }

    if (isArray(item)) {
      let back = {};
      if (item.length === headers.length) {
        item.forEach((n, nIndex) => {
          const obj = {};
          obj[headers[nIndex].toString()] = n;
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
