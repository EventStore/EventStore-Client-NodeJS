module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "eslint-plugin-tsdoc"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  rules: {
    "no-constant-condition": ["error", { checkLoops: false }],
    // prettier decides
    "no-unexpected-multiline": ["off"],
    "no-async-promise-executor": ["off"],
    "@typescript-eslint/no-unsafe-function-type": ["off"],
    "@typescript-eslint/no-empty-interface": [
      "error",
      {
        allowSingleExtends: true,
      },
    ],
    "@typescript-eslint/no-non-null-assertion": ["off"],
    // better handled by ts itself
    "@typescript-eslint/no-unused-vars": ["off"],

    "tsdoc/syntax": "warn",
  },
};
