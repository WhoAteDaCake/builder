/*
  Build as a pipeline
  so: 
  run([
    configure()
    when('build', [

    ], 3);
  ]);
*/
const { start, configure, customise, when, tap } = require('../src/v2');

start([configure(), when('build', [n => ({ test: true })]), tap(console.log)]);
