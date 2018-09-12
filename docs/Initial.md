# Configuration

```javascript
const config = {
  action: Promise.resolve(),
  meta: {
    home: process.cwd(),
  },
  files: {
    input: '',
    output: '',
    html: ''.
    extensions: /\.(js|jsx|css|less|sass)$/,
  },
  build: {
    rollup: {
      format: 'cjs',
      resolve: {},
      commonjs: {},
      json: {},
      extra: {},
    },
    babel: {},
  },
};
```
