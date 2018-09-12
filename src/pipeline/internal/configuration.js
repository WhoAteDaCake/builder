const R = require('ramda');

const INTERNAL_KEY = 'internalValue';

const get = R.prop(INTERNAL_KEY);
const add = R.assoc(INTERNAL_KEY);
const remove = R.dissoc(INTERNAL_KEY);

module.exports = { add, remove, get };
