const R = require('ramda');
const webpack = require('webpack');
const { setupDevServer, setupWebpack } = require('../helpers/webpack');
const chalk = require('chalk');
const WebpackDevServer = require('webpack-dev-server');
const { createCompiler, prepareUrls } = require('react-dev-utils/WebpackDevServerUtils');
const getMeta = require('./getMeta');

function handleCompile(err, stats) {
  if (err || stats.hasErrors() || stats.hasWarnings()) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

const withDefaults = (obj1, obj2) => R.mergeDeepRight(obj1, obj2 || {});

function devServer(config) {
  return config => {
    const { babel, files, meta } = getMeta()(config);
    const env = withDefaults(
      { NODE_ENV: 'development', IP: 'localhost', PORT: 8080, PROTOCOL: 'http' },
      process.env
    );
    const extra = withDefaults(
      {
        compiler: { env: { NODE_ENV: JSON.stringify(env.NODE_ENV) } },
        server: {},
      },
      config
    );

    const { input, output, html } = withDefaults(
      { input: 'demo/index.js', output: 'public', html: 'demo/index.html' },
      files
    );
    const devConfig = setupDevServer({
      host: env.IP,
      port: env.PORT,
      contentBase: output,
      extra: extra.server,
    });
    const webpackConf = setupWebpack({
      babel,
      env,
      meta,
      app: { input, output, html },
      exta: extra.compiler,
    });
    const urls = prepareUrls(env.PROTOCOL, env.IP, env.PORT);
    const compiler = createCompiler(webpack, webpackConf, meta.name, urls, true);
    const devServer = new WebpackDevServer(compiler, devConf);

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
