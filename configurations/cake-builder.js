/*
  Build as a pipeline
  so: 
  run([
    configure()
    when('build', [

    ], 3);
  ]);
*/
const { start, configure, customise, when, tap } = require('../src');

start([configure(), when('build', [n => ({ test: true })]), tap(console.log)]);
