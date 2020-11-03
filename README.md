# addIdToArray

![npm](https://img.shields.io/npm/v/addidtoarray)
![npm](https://img.shields.io/npm/dw/addidtoarray)
![npm bundle size](https://img.shields.io/bundlephobia/min/addidtoarray)

A simply function to add a id to your data.

```js
const addIdToArray = require('addidtoarray');

addIdToArray(
  [
    ['Jeff', 19],
    ['Maria', 20],
  ],
  ['name', 'age']
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
addIdToArray(arr, headers, start, increment_name, increment_step);
```

| Parameter      | Description                                   | Example          | Default | Required |
| -------------- | --------------------------------------------- | ---------------- | ------- | -------- |
| arr            | Raw data without id.                          | ['Jeff',19]      | /       | X        |
| headers        | How to call the properties <br>of the object. | ['name', 'age']  | /       |          |
| start          | start + 1 is the first id.                    | 100              | 0       |          |
| increment_name | How the 'id' property is called.              | 'special_number' | 'id'    |          |
| increment_step | The increment step of the id.                 | 5                | 1       |          |

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
  const data = addIdToArray(countries, ['name', 'capital']);
  /*
   * data: [ { id: 1, name: 'USA', capital: 'Washington D.C.' },
   *         { id: 2, name: 'Germany', capital: 'Berlin' } ]
   */
  await knex('country').insert(data);
};
```

## Todo

- [ ] better code documentation (maybe jsdoc)
- [ ] add more examples
- [ ] write better tests, see [1. issue](https://github.com/LetsMelon/addIdToArray/issues/1)
- [ ] custom id function, see [2. issue](https://github.com/LetsMelon/addIdToArray/issues/2)
