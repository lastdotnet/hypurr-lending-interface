module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: [
          'apps/*/tsconfig.json',
          'packages/*/tsconfig.json',
          'services/*/tsconfig.json',
        ],
      },
    },
  },
};
