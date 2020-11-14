//.eslintrc.js
module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    allowImportExportEverywhere: false,
    ecmaFeatures: {
      globalReturn: false,
    },
    plugins: [
      "@typescript-eslint",
      "prettier",
      "prettier/@typescript-eslint",
      "prettier/babel"
    ],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier'
    ]

    // babelOptions: {
    //   configFile: "path/to/config.js",
    // },
  },
};
// {
//   "parser": "babel-eslint",
//   "extends": [
//     "prettier"
//   ],
//   "plugins": [
//     "prettier"
//   ],
//   "env": {
//     "browser": true,
//     "es6": true,
//     "mocha": true
//   },
//   "rules": {
//     "prettier/prettier": [
//       "warn"
//     ]
//   }
// }
