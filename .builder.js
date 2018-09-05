// const pkg = require('./package.json');
// const external = [
//   ...Object.keys(pkg.dependencies || {}),
//   ...Object.keys(pkg.peerDependencies || {}),
// ];

// module.exports = (builder, initial) => {
//   const buildConf = {
//     external,
//     commonjs: {
//       ignore: external,
//       namedExports: {
//         'node_modules/immutable/dist/immutable.js': ['Map', 'Set', 'Range', 'List'],
//       },
//     },
//   };

//   builder
//     .when(initial.mode === 'library', () => {
//       builder.update(options =>
//         builder.deepMerge(options, {
//           files: { exclude: [/Demo/] },
//           build: buildConf,
//         })
//       );
//     })
//     .when(initial.mode === 'bundle', () => {
//       builder.update(options =>
//         builder.deepMerge(options, {
//           files: { exclude: [/Demo/], output: pkg.main },
//           build: buildConf,
//         })
//       );
//     });
// };
