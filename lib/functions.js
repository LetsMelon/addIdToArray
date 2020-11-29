/*!
 * addidtoarray <https://github.com/LetsMelon/addIdToArray>
 *
 * Copyright (c) 2020, Domenic
 * Released under the MIT License.
 */

// eslint-disable-next-line prefer-destructuring
const isArray = Array.isArray;

const isObject = (variable) =>
  typeof variable === 'object' && variable !== null;

const mergeObject = (obj1, obj2) => Object.assign(obj1, obj2);

module.exports = { isArray, isObject, mergeObject };
