const R = require('ramda');
const webpack = require('webpack');
const { buildDevServer, buildWebpack } = require('../config/webpack');
const WebpackDevServer = require('webpack-dev-server');
const { createCompiler, prepareUrls } = require('react-dev-utils/WebpackDevServerUtils');

function handleCompile(err, stats) {
  if (err || stats.hasErrors() || stats.hasWarnings()) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

function devServer(devConfig) {
  return config => {
    const { babel } = config.rollup;
    const { env, files } = config;
    const { input, output, html } = R.merge(
      { input: 'demo/index.js', output: 'public', html: 'demo/index.html' },
      files
    );
    const devConf = R.pipe(
      R.merge({ host: 'localhost', port: 8080, contentBase: output }),
      buildDevServer
    )(devConfig);

    const webpackConf = buildWebpack({
      babel,
      env,
      app: {
        js: input,
        output,
        html,
      },
    });
    const urls = prepareUrls('http', 'localhost', 8080);
    const compiler = createCompiler(webpack, webpackConf, 'test', urls, true);
    const devServer = new WebpackDevServer(compiler, devConf);
    // Launch WebpackDevServer.
    devServer.listen(8080, 'localhost', err => {
      if (err) {
        return console.log(err);
      }
      // if (isInteractive) {
      //   clearConsole();
      // }
      // console.log(chalk.cyan('Starting the development server...\n'));
      // openBrowser(urls.localUrlForBrowser);
    });

    return config;
  };
}

module.exports = devServer;
