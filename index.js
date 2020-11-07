/*!
 * addidtoarray <https://github.com/LetsMelon/addIdToArray>
 *
 * Copyright (c) 2020, Domenic
 * Released under the MIT License.
 */

const isArray = Array.isArray;
const isObject = (variable) => typeof variable === 'object' && variable !== null;

/**
 * Default function to generate the id value.
 * 
 * @param {*} item Is the current item at the index in arr. Passed from the main function.
 * @param {Object} params Parameters passed from the main function. Always defined!
 * @param {Number} params.current_number params.start + params.index * params.increment_step
 * @param {Number} params.index Current index in 'arr' from main function
 * @param {String} params.increment_name 'increment_name' passed to main function or default value
 * @param {Number} params.increment_step 'increment_step' passed to main function or default value
 * @param {Number} params.start 'start' passed to main function or default value
 * 
 * @returns {Object}
 */
const simple_id_function = (item, params) => {
  const back = {};
  back[params.increment_name] = params.current_number;
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
 * @param {string} [parameter.increment_name='id']  How the 'id' property is called.
 * @param {number} [parameter.increment_step=1] The increment step of the id.
 * @param {function} [parameter.custom_id_function=simple_id_function] Set a function to generate the id. More in README.md
 * 
 * @returns {Object[]} Each entry has a parameter (see increment_name) with a id.
 */
module.exports = (arr, parameter) => {
  let {headers, start, increment_name, increment_step, custom_id_function} = parameter || {};

  arr = isArray(arr) ? arr : [arr];
  headers = headers === undefined ? [] : isArray(headers) ? headers : [headers];
  start = (start === undefined || typeof start !== 'number' || start < 0) ? 1 : start;
  increment_name = (increment_name === undefined || typeof increment_name !== 'string' || increment_name.length < 1) ? 'id' : increment_name;
  increment_step = (increment_step === undefined || typeof increment_step !== 'number') ? 1 : increment_step;
  custom_id_function = (custom_id_function === undefined || typeof custom_id_function !== 'function') ? simple_id_function : custom_id_function;

  return arr.map((item, index) => {
    const i = start + index * increment_step;

    const params = {current_number: i, index, increment_name, increment_step, start};
    let idObj = custom_id_function(item, params);
    if (!isObject(idObj)) idObj = simple_id_function(item, params);

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
