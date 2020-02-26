module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/recommended', // essential에서 recommended로 변경
    '@vue/airbnb',
    '@vue/prettier',
    'prettier',
  ],
  rules: {
    "prettier/prettier": ['error', {
      singleQuote: true,
      semi: true,
      userTabs: true,
      tabWidth: 2,
      trailingComma: 'all',
      printWidth: 80,
      bracketSpacing: true,
      arrowParens: 'avoid',
    }],
    'linebreak-style': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "no-param-reassign": [
      "error",
      {
        "props": true,
        "ignorePropertyModificationsFor": [
          "state",
          "acc",
          "e",
          "ctx",
          "req",
          "request",
          "res",
          "response",
          "$scope"
        ]
      }
    ],
    "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
    "import/no-extraneous-dependencies": ["error", { "devDependencies": true, "optionalDependencies": false, "peerDependencies": false }],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
