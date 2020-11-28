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

module.exports = { isArray, isObject };
