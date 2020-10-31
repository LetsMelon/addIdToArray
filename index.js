const isArray = Array.isArray;
const isObject = require('isobject');

module.exports = (arr, headers = [], start = 1) => {
  let i = start - 1 < 0 ? 0 : start - 1;
  return arr.map((item) => {
    i += 1;

    const idObj = { id: i };

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
