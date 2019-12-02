/* eslint-disable parser */
module.exports = {
  parser: [1, "always"],
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 7,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  }
};
