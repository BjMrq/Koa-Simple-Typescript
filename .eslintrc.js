module.exports = {
  "ignorePatterns": ["**/.eslintrc.js"],
  "parserOptions": {
    "ecmaVersion": 10,
    "parser": "@typescript-eslint/parser",
    "project": "./tsconfig.json"
  },
  "extends": [
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "airbnb-typescript/base",
    "hardcore/ts-for-js",
    "hardcore",
    "koa",
  ],
  "plugins": [
    "@typescript-eslint",
  ],
  "settings": {
    "import/parsers": {
      "@typescript-eslint/parser": [
        ".ts",
        ".js",
      ]
    },
    "import/extensions": [
      ".js",
      ".ts",
    ],
    "import/resolver": {
      "node": {
        "extensions": [
          ".js",
          ".ts",
          ".jsx",
          ".tsx"
        ],
        "moduleDirectory": [
          "node_modules",
          "./src"
        ]
      }
    }
  },
  "rules": {
    // Import
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
    ],
    "import/exports-last": "off",
    "import/group-exports": "off",
    "import/no-namespace": "off",
    "import/max-dependencies": "off",
    "import/no-cycle": "off",
    "import/no-unused-modules": "off",
    "import/prefer-default-export": "off",
    // Typescript
    "@typescript-eslint/naming-convention": ["error", {
      "selector": ["variable"],
      "format": ["camelCase", "PascalCase", "UPPER_CASE"],
      "leadingUnderscore": "allow"
    }],
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/no-confusing-void-expression": "off",
    "@typescript-eslint/no-shadow": "off",
    "@typescript-eslint/no-magic-numbers": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }
    ],
    // Others
    "max-len": ["error", { "ignoreComments": true }],
    "max-statements": "off",
    "lines-around-comment": "off",
    "no-shadow": "off",
    "no-use-before-define": "off",
    "indent": "off",
    "func-style": "off",
    "no-return-await": "off",
    "comma-dangle": "off",
    "quotes": "off",
    "arrow-parens": "off",
    "space-before-function-paren": "off",
    "no-magic-numbers": "off"
  },
  "env": {
    "node": true
  },
};