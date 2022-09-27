module.exports = {
  plugins: ['react'],
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parser: '@babel/eslint-parser',
  //following block is necessary because otherwise
  //ESLInt throws error on `require` and `module` keyword
  //which are of course available in node (because of node's
  //CommonJS module system) but are not a feature of ES5 or ES6
  env: {
    node: true,
  },
  settings: {
    react: {
      version: '16.14.0',
    },
  },
};
