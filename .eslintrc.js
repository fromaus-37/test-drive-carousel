module.exports = {
  plugins: ['react'],
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    // this is necessary because
    // defult is ES5 which throws
    //errors on things like arrow functions
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
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
