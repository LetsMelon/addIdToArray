# addIdToArray

![npm](https://img.shields.io/npm/v/addidtoarray)
![npm](https://img.shields.io/npm/dw/addidtoarray)
![npm bundle size](https://img.shields.io/bundlephobia/min/addidtoarray)

A simply function to add a id to your data.

```js
const addIdToArray = require('addidtoarray');

addIdToArray([['Jeff', 19], ['Maria', 20], ],
  { headers: ['name', 'age']}
);
// --> [{id: 1, name: 'Jeff', age: 19}, ...]

addIdToArray({ name: 'Jeff', age: 19 });
// --> [{id: 1, name: 'Jeff', age: 19}]
```

## Install

Install with [npm](https://www.npmjs.com):

```sh
$ npm install addidtoarray
```

## Usage

```js
const addIdToArray = require('addidtoarray');
```

### Parameter

```js
addIdToArray(arr, parameter: {headers, start, increment_name, 
  increment_step, custom_id_function}
);
```

| Parameter                    | Data type                             | Description                                  | Example                              | Default                      | Required |
|------------------------------|---------------------------------------|----------------------------------------------|--------------------------------------|------------------------------|----------|
| arr                          | Array or Object                       | Raw data without id.                         | ['Jeff',19] ;<br>{['Jeff', 19}, ...] |                              |     X    |
| parameter                    | Object                                | Optional parameters!                         | see in README<br>or index.js         |              {}              |          |
| parameter.headers            | String or [String]                    | How to call the properties<br>of the object. | ['name', 'age'] ;<br>'name'          |           undefined          |          |
| parameter.start              | Number                                | start + 1 is the first id.                   | 100                                  |               1              |          |
| parameter.increment_name     | String                                | How the 'id' property is called.             | 'special_number'                     |             'id'             |          |
| parameter.increment_step     | Number                                | The increment step of the id.                | 5                                    |               1              |          |
| parameter.custom_id_function | Function<br>(has to return an object) | Function to generate the id.                 | see in README<br>or index.js         | see in README<br>or index.js |          |

### Custom id function

##### Requirements

Version: <b>>= 1.2.0-develop</b>

- has to <b>accept two parameters</b>
  - item: Array or Object
  - params: Object
    - current_number: calculated number with `start` and `increment_step`
    - index: index from item in `arr`
    - increment_name: same as `increment_name` from addIdToArray
    - increment_step: same as `increment_step` from addIdToArray
    - start: same as `start` from addIdToArray
- has to <b>return an object</b>, if not --> use default function

##### Template

```js
const customIdFunctionTemplate = (item, params) => {
  return {};
}
```

##### Default

```js
const simple_id_function = (item, params) => {
  const back = {};
  back[params.increment_name] = params.current_number;
  return back;
};
```

## Run tests

```sh
$ git clone https://github.com/LetsMelon/addIdToArray.git
$ cd addIdToArray
$ npm ci
$ npm test
```

## Examples

### knex.js

This library can be used to format demo data for a database.

<u>Seed file</u>:

```js
const addIdToArray = require('addidtoarray');

exports.seed = async (knex) => {
  const countries = [
    ['USA', 'Washington D.C.'],
    ['Germany', 'Berlin'],
  ];
  const data = addIdToArray(countries, 
    { headers: ['name', 'capital']}
  );
  /*
   * data: [ { id: 1, name: 'USA', capital: 'Washington D.C.' },
   *         { id: 2, name: 'Germany', capital: 'Berlin' } ]
   */
  await knex('country').insert(data);
};
```

### custom Id function - hash

Require a 'hash' library like: [object-hash](https://www.npmjs.com/package/object-hash), [crypto-js](https://www.npmjs.com/package/crypto-js), [hash.js](https://www.npmjs.com/package/hash.js)

```js
const addIdToArray = require('addidtoarray');
const hash = require('object-hash');

const customHashIdFunction = (item, params) => {
  const back = {};
  back[params.increment_name] = hash(item);
  return back;
};

const data = [['Jeff', 19], ['Maria', 20]];
const hashedData = addIdToArray(data, 
  { headers: ['name', 'age'], custom_id_function: customHashIdFunction}
);
/*
 * hashedData: [{id: 'fb...75', name: 'Jeff', age: 19},
 *              {id: 'c2...82', name: 'Maria', age: 20}]
 */
```

## Todo

- [ ] better code documentation (maybe jsdoc)
- [ ] add more examples
- [ ] write better tests, see [1. issue](https://github.com/LetsMelon/addIdToArray/issues/1)
- [x] custom id function, see [2. issue](https://github.com/LetsMelon/addIdToArray/issues/2)
