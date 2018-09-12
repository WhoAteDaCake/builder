const { run, start } = require('./run');
const configure = require('./configure');
const customise = require('./customise');
const when = require('./when');
const tap = require('./tap');
const bundle = require('./bundle');
const library = require('./library');
const proceed = require('./proceed');
const devServer = require('./devServer');
const getMeta = require('./getMeta');
const { tag } = require('./tag');

module.exports = {
  run,
  start,
  configure,
  customise,
  when,
  tap,
  bundle,
  library,
  proceed,
  devServer,
  getMeta,
  tag,
};
