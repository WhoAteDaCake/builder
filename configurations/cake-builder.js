/*
  Build as a pipeline
  so: 
  run([
    configure()
    when('build', [

    ], 3);
  ]);
*/
const pipeline = require('../src/v2');

pipeline.run([
  pipeline.configure(),
  // pipeline
  console.log,
]);
