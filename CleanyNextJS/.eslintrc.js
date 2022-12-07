/* eslint-disable no-undef */
module.exports = {
  'env': {
    'node': true,
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  'settings': {
    'react': {
      'version': 'latest',
    },
  },
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'plugins': [
    'react',
  ],
  'globals': {
    'process': true,
  },
  'rules': {
    'indent': 'off',
    'linebreak-style': 0,
    'quotes': 'off',
    'semi': 0
    ,
    'comma-dangle': [
      'error',
      'only-multiline',
    ],
  },
};
