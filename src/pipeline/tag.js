const fs = require('fs-extra');
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { runC } = require('./run');
const getMeta = require('./getMeta');
const configuration = require('./internal/configuration');
const { PipelineError } = require('../helpers/error');

const versionFromArgv = R.pathOr(undefined, ['argv', '3']);

function tagCore(version) {
  return config => {
    const finalVersion = version ? version : versionFromArgv(config);
    const packageVersion = R.pathOr(undefined, ['meta', 'pkg', 'version'], config);
    const runner = exec;
    return configuration.add({
      finalVersion,
      packageVersion,
      runner,
    });
  };
}

function tagRun(config) {
  const { finalVersion, packageVersion, runner } = configuration.get(config);
  const action = R.propOr(Promise.resolve(), 'action', config);
  if (!finalVersion) {
    throw new PipelineError(`Tag version was not defined`);
  }
  if (!packageVersion) {
    throw new PipelineError(`Version was not found in package.json`);
  }
  if (packageVersion !== finalVersion) {
    throw new PipelineError(`Tag version does not match version in package.json`);
  }

  async function runAsync() {
    // const hasChanges = git diff-index --quiet HEAD
  }

  return R.merge(config, {
    action: action.then(runAsync),
  });
}

function tag(version) {
  return runC([getMeta(), tagCore(version), tagRun, configuration.remove]);
}

module.exports = { tag, tagRun, tagCore };
