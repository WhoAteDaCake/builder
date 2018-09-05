const fs = require('fs');
const path = require('path');
const R = require('ramda');
const dirTree = require('directory-tree');
const { build } = require('./defaults');

const modules = {
  library: require('./library'),
  bundle: require('./bundle'),
};

const CONTROLLER_FILE = '.builder.js';

module.exports = (argv, home) => {
  let options = {
    mode: argv[2],
    nodeEnv: process.env.NODE_ENV || 'development',
    files: {},
    prettier: {},
    home,
    build,
  };
  let customModule;
  const builder = {
    deepMerge: R.mergeDeepRight,
    merge: (obj1, obj2) => Object.assign({}, obj1, obj2),
    getOptions() {
      return options;
    },
    update(fn) {
      options = fn(options);
      return builder;
    },
    when(predicate, fn) {
      if (predicate) {
        fn(options);
      }
      return builder;
    },
    custom(pathOrModule) {
      customModule = typeof pathOrModule === 'string' ? require(pathOrModule) : pathOrModule;
      return builder;
    },
  };

  // Controller handling
  const controllerPath = path.resolve(options.home, CONTROLLER_FILE);
  if (fs.existsSync(controllerPath)) {
    const controller = require(controllerPath);
    switch (typeof controller) {
      case 'function': {
        // We expect side effects here, so
        const resp = controller(builder, options);
        if (typeof resp === 'object') {
          options = deepMerge(controller);
        }
        break;
      }
      case 'object': {
        options = deepMerge(controller);
      }
    }
  }
  const mode = str => R.propEq('mode', str);
  R.cond([
    [mode('library'), modules.library(builder)],
    [mode('bundle'), modules.bundle(builder)],
    [mode('custom'), opts => customModule(builder)(opts)],
  ])(options);
};
