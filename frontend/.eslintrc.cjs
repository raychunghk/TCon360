module.exports = {
  
  extends: ['mantine', 'plugin:@next/next/recommended', 'plugin:jest/recommended'],
  plugins: ['testing-library', 'jest'],
  overrides: [
    {
      files: ['**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    // suppress errors for missing 'import React' in files
    "react/react-in-jsx-scope": "off",
    // allow jsx syntax in js files (for next.js project)
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }], //should add ".ts" if typescript project


    'import/extensions': 'off',
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/no-explicit-any": "off", // Change from "error" to "off"
  },
};
