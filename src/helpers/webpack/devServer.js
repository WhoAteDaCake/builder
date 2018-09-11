const R = require('ramda');
const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');

module.exports = ({ contentBase, port, host, extra }) =>
  R.mergeDeepRight(
    {
      port,
      host,
      contentBase,
      overlay: true,
      useLocalIp: true,
      publicPath: '/',
      historyApiFallback: {
        disableDotRule: true,
      },
      watchOptions: { ignored: /node_modules/, aggregateTimeout: 300, poll: 1000 }, // It suppress error shown in console, so it has to be set to false.
      quiet: false, // It suppress everything except error, so it has to be set to false as well
      // to see success build.
      noInfo: false,
      stats: 'minimal',
      before(app) {
        // This lets us open files from the runtime error overlay.
        app.use(errorOverlayMiddleware());
        // This service worker file is effectively a 'no-op' that will reset any
        // previous service worker registered for the same host:port combination.
        // We do this in development to avoid hitting the production cache if
        // it used the same host and port.
        // https://github.com/facebook/create-react-app/issues/2272#issuecomment-302832432
        app.use(noopServiceWorkerMiddleware());
      },
    },
    extra
  );
