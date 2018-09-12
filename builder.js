const { start, when, tag } = require('./src');

start([when('tag', [tag()])]);
