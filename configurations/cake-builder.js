/*
  Build as a pipeline
  so: 
  run([
    configure()
    when('build', [

    ], 3);
  ]);
*/
const { run, configure, customise, when, tap } = require('../src/v2');

run([configure(), when('build', [n => ({ test: true })]), tap(console.log)]);
