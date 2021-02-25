module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "jsdoc"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsdoc/recommended",
  ],
  rules: {
    "no-constant-condition": ["error", { checkLoops: false }],
    // prettier decides
    "no-unexpected-multiline": ["off"],
    "@typescript-eslint/no-empty-interface": [
      "error",
      {
        allowSingleExtends: true,
      },
    ],
    "@typescript-eslint/no-non-null-assertion": ["off"],
    // better handled by ts itself
    "@typescript-eslint/no-unused-vars": ["off"],

    "jsdoc/check-alignment": ["off"],
    "jsdoc/check-examples": ["warn"],
    "jsdoc/check-indentation": ["warn"],
    "jsdoc/check-syntax": ["warn"],
    "jsdoc/newline-after-description": ["warn", "never"],
    "jsdoc/no-types": ["error", { contexts: ["any"] }],
    "jsdoc/require-description": ["warn"],
    "jsdoc/require-description-complete-sentence": ["warn"],
    "jsdoc/require-jsdoc": ["off"],
    "jsdoc/require-param-type": ["off"],
    "jsdoc/require-returns": ["off"],
  },
};
