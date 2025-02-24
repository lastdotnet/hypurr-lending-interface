const MINIMUM_VARIABLE_LENGTH = 2

module.exports = {
  extends: [
    './base',
    'eslint:recommended',
    'plugin:security/recommended-legacy',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  overrides: [
    {
      files: [
        '**/src/pages/api/**/*',
        '**/src/app/api/**/*',
        '**/*.stories.tsx',
        '**/scripts/**/*',
        '**/ts-scripts/**/*',
      ],
      rules: {
        'no-console': 'off',
      },
    },
    {
      files: ['**/*.test.tsx', '**/*.test.ts', '**/*.stories.tsx', 'mock-data.ts'],
      rules: {
        'no-magic-numbers': 'off',
      },
    },
    {
      extends: ['plugin:vitest/recommended'],
      files: ['**/*.test.tsx', '**/*.test.ts'],
      plugins: ['vitest'],
    },
    {
      files: ['playwright.config.ts', 'vite.config.mts'],
      rules: {
        'no-restricted-exports': 'off',
      },
    },
  ],
  plugins: [
    '@typescript-eslint',
    'security',
    'sentence-case',
    'sort-destructure-keys',
    'sort-keys-fix',
    'typescript-sort-keys',
    'unused-imports',
  ],
  rules: {
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        disallowTypeAnnotations: true,
        fixStyle: 'inline-type-imports',
        prefer: 'type-imports',
      },
    ],
    '@typescript-eslint/no-base-to-string': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-non-null-assertion': ['error'],
    '@typescript-eslint/no-unused-vars': 'off',
    'arrow-body-style': ['error', 'as-needed'],
    curly: ['error', 'all'],
    eqeqeq: ['error', 'always'],
    'id-length': [MINIMUM_VARIABLE_LENGTH, { exceptions: ['a', 'b'], properties: 'never' }],
    'no-console': 'error',
    'no-magic-numbers': ['error', { ignore: [-1, 0, 1, '0n', '1n'], ignoreArrayIndexes: true }],
    'no-nested-ternary': 'error',
    'no-restricted-imports': [
      'error',
      {
        paths: ['.', '../.', '../../.', './', '.././', '../.././', '../', '../../', '../../../'],
        patterns: [
          {
            group: [
              '../packages',
              '../../packages',
              '../../../../packages',
              '../../../../../packages',
              '../../../../../../packages',
              '../../../../../../../packages',
              '../../../../../../../../packages',
              '../../../../../../../../../packages',
              '../../../../../../../../../../packages',
            ],
            message: 'Import from the package directly instead.',
          },
          {
            group: ['^indexer$', '^indexer/lib', '^indexer/lib/*', '^indexer/src', '^indexer/src/*'],
            message: 'Import from `indexer/model` instead, else the web-app will try to run sqd.',
          },
          {
            group: ['sdk/src', 'sdk/src/*'],
            message: 'Import from `sdk` or `sdk/abi` instead.',
          },
        ],
      },
    ],
    'no-restricted-exports': [
      'error',
      {
        restrictDefaultExports: {
          defaultFrom: true,
          direct: true,
          named: true,
          namedFrom: true,
          namespaceFrom: true,
        },
      },
    ],
    'object-shorthand': ['error', 'always'],
    'prefer-template': 'error',
    'security/detect-object-injection': 'off',
    'security/detect-possible-timing-attacks': 'off',
    // turn on to test literals - it's buggy though
    // 'sentence-case/sentence-case': 'error',
    'sort-destructure-keys/sort-destructure-keys': ['error', { caseSensitive: false }],
    'sort-keys-fix/sort-keys-fix': [
      'error',
      'asc',
      {
        caseSensitive: false,
        natural: true,
      },
    ],
    'typescript-sort-keys/interface': 'error',
    'typescript-sort-keys/string-enum': 'error',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
}
