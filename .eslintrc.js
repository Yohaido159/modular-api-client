module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
    browser: true,
    'jest/globals': true,
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
    'import/internal-regex': '^@',
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
  parserOptions: { ecmaVersion: 2020, sourceType: 'module' },
  ignorePatterns: ['node_modules/*'],
  plugins: ['jest', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'import/no-unresolved': 'error',
    'linebreak-style': 'off',
    'no-empty': 'off',

    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    'import/default': 'off',
    'import/no-cycle': 2,
    'import/no-named-as-default-member': 'off',
    'import/no-named-as-default': 'off',

    '@typescript-eslint/no-unused-vars': ['warn'],

    '@typescript-eslint/explicit-function-return-type': ['off'],
    '@typescript-eslint/explicit-module-boundary-types': ['off'],
    '@typescript-eslint/no-empty-function': ['off'],
    '@typescript-eslint/no-explicit-any': ['off'],

    // 'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: 'import', next: 'const' },
      { blankLine: 'any', prev: 'import', next: 'import' },
    ],
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      settings: {
        'import/resolver': {
          typescript: {},
        },
        'import/internal-regex': '^@',
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
      },
    },
  ],
};
