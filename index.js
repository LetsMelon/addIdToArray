const isArray = require('isarray');
const isObject = require('isobject');

const f = (arr, start = 1, headers = []) => {
  let i = start - 1 < 0 ? 0 : start - 1;
  return arr.map((item) => {
    i += 1;

    const idObj = { id: i };

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

    if (isArray(headers) && headers.length === 1) {
      const head = headers[0].toString();
      const obj = {};
      obj[head] = item;
      return { ...idObj, ...obj };
    }

    return { ...idObj };
  });
};

module.exports = f;