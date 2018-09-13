const R = require('ramda');
const webpack = require('webpack');
const path = require('path');
const chalk = require('chalk');
const WebpackDevServer = require('webpack-dev-server');
const { createCompiler, prepareUrls } = require('react-dev-utils/WebpackDevServerUtils');
const { setupServer, setupCompiler } = require('../helpers/webpack');
const { formatPath } = require('../helpers/files');
const getMeta = require('./getMeta');

const resolvePaths = base => paths => ({
  ...paths,
  input: formatPath(base, paths.input),
  html: formatPath(base, paths.html),
});

const withDefaults = R.curry((obj1, obj2) => R.mergeDeepRight(obj1, obj2 || {}));

function devServer(initial) {
  return config => {
    const { build, files, meta } = getMeta()(config);
    const env = withDefaults(
      { NODE_ENV: 'development', IP: 'localhost', PORT: 8080, PROTOCOL: 'http' },
      process.env
    );
    const extra = withDefaults(
      {
        compiler: { env: { NODE_ENV: JSON.stringify(env.NODE_ENV) } },
        server: {},
      },
      initial
    );
    const { input, output, html } = R.pipe(
      withDefaults({ input: 'demo/index.js', output: 'public', html: 'demo/index.html' }),
      resolvePaths(meta.home)
    )(files);
    const devConfig = setupServer({
      host: env.IP,
      port: env.PORT,
      contentBase: output,
      extra: extra.server,
    });
    const webpackConfig = setupCompiler({
      babel: build.babel,
      env,
      meta,
      app: { input, output, html },
      extra: extra.compiler,
    });
    const urls = prepareUrls(env.PROTOCOL, env.IP, env.PORT);
    const compiler = createCompiler(webpack, webpackConfig, meta.name, urls, true);
    const devServer = new WebpackDevServer(compiler, devConfig);

    devServer.listen(env.PORT, env.IP, error => {
      if (error) {
        return console.log(error);
      }
      console.log(chalk.cyan('Starting the development server...\n'));
    });

    ['SIGINT', 'SIGTERM'].map(sig => {
      process.on(sig, () => {
        devServer.close();
        process.exit();
      });
    });

    return config;
  };
}

module.exports = devServer;
