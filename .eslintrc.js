module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    "@typescript-eslint/ban-types": ["error",
      {
        "types": {
          "String": false,
          "Boolean": false,
          "Number": false,
          "Symbol": false,
          "{}": false,
          "Object": false,
          "object": false,
          "Function": false,
        },
        "extendDefaults": false
      }
    ],
    "prefer-const": ["error", {
      "destructuring": "all",
      "ignoreReadBeforeAssign": false,
    }],
    "lines-around-comment": [
      "error",
      {
        "beforeBlockComment": true,
        "afterBlockComment": true,
        "beforeLineComment": true,
        "afterLineComment": true,
        "allowBlockStart": true,
        "allowBlockEnd": true,
        "allowObjectStart": true,
        "allowObjectEnd": true,
        "allowArrayStart": true,
        "allowArrayEnd": true
      }
    ],
    "max-len": ["error", {"code": 120, "ignoreUrls": false}],
    "no-confusing-arrow": ["error", { "allowParens": false }],
    "no-tabs": ["error", {"allowIndentationTabs": true}],
    "no-unexpected-multiline": "error",
    "no-mixed-operators": [
      "error",
      {
        "groups": [
          ["+", "-", "*", "/", "%", "**"],
          ["&", "|", "^", "~", "<<", ">>", ">>>"],
          ["==", "!=", "===", "!==", ">", ">=", "<", "<="],
          ["&&", "||"],
          ["in", "instanceof"]
        ],
        "allowSamePrecedence": true
      }
    ]
  },
};
