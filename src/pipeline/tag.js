const fs = require('fs-extra');
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const R = require('ramda');
const debug = require('../helpers/debug')('pipeline:tag');
const { runC } = require('./run');
const getMeta = require('./getMeta');
const configuration = require('./internal/configuration');
const { PipelineError } = require('../helpers/error');

const commands = {
  gitNotCommited: 'git status --untracked-files=no --porcelain',
  gitBranch: "git branch | grep \\* | cut -d ' ' -f2",
};

const logStd = ({ stdout, stderr }) => {
  if (stdout.length !== 0) {
    debug(stdout);
  }
  if (stderr.length !== 0) {
    debug(stderr);
  }
  return { stdout, stderr };
};
const notEmptyStdout = resp => resp.stdout.length !== 0;
const versionFromArgv = R.pathOr(undefined, ['argv', '3']);

function tagCore(version) {
  return config => {
    const finalVersion = version ? version : versionFromArgv(config);
    const packageVersion = R.pathOr(undefined, ['meta', 'pkg', 'version'], config);
    const runner = exec;
    return configuration.add(
      {
        finalVersion,
        packageVersion,
        runner,
      },
      config
    );
  };
}

function tagRun(config) {
  const { finalVersion, packageVersion, runner } = configuration.get(config);
  const action = R.propOr(Promise.resolve(), 'action', config);
  if (!finalVersion) {
    throw new PipelineError('Tag version was not defined');
  }
  if (!packageVersion) {
    throw new PipelineError('Version was not found in package.json');
  }
  if (packageVersion !== finalVersion) {
    throw new PipelineError('Tag version does not match version in package.json');
  }

  async function runAsync() {
    const hasUncommited = await runner(commands.gitNotCommited).then(notEmptyStdout);
    if (hasUncommited) {
      throw new PipelineError('Please commit the changes before tagging');
    }
    const branch = await runner(commands.gitBranch).then(resp => resp.stdout.replace('\n', ''));
    const hasUnPushed = await runner(`git log --oneline origin/${branch}..${branch}`).then(
      notEmptyStdout
    );
    if (hasUnPushed) {
      throw new PipelineError('Please push the changes before tagging');
    }
    await runner(`git tag -a v${finalVersion} -m v${finalVersion}`).then(logStd);
    await runner(`git push origin v${finalVersion}`).then(logStd);
  }

  return R.merge(config, {
    action: action.then(runAsync),
  });
}

function tag(version) {
  return runC([getMeta(), tagCore(version), tagRun, configuration.remove]);
}

module.exports = { tag, tagRun, tagCore };
