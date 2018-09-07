const { DEBUG_PREFIX } = require('../config/debug');

module.exports = name => require('debug')(DEBUG_PREFIX + name);
