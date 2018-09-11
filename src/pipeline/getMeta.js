const R = require('ramda');
const fs = require('fs');
const path = require('path');
const { PipelineError } = require('../helpers/error');

function getMeta() {
  return config => {
    const { home } = config.meta;
    const modules = path.join(home, 'node_modules');
    if (!fs.existsSync(modules)) {
      throw new PipelineError(`node_modules not found in ${modules}`);
    }
    const pkgPath = path.join(home, 'package.json');
    if (!fs.existsSync(pkgPath)) {
      throw new PipelineError(`package.json not found in ${pkg}`);
    }
    const pkg = require(pkgPath);

    const yarn = fs.existsSync(path.join(home, 'yarn.lock'));
    const meta = { home, yarn, modules, name: pkg.name || 'No name' };
    return R.mergeDeepRight({ meta }, config);
  };
}

module.exports = getMeta;
