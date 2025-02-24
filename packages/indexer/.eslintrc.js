module.exports = {
  extends: ['astaria/core'],
  overrides: [
    {
      files: ['src/abi/**/*.*'],
      rules: {
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        eqeqeq: 'off',
        'id-length': 'off',
        'no-magic-numbers': 'off',
        'sort-keys-fix/sort-keys-fix': 'off',
      },
    },
    {
      files: ['src/model/generated/**/*.*'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        eqeqeq: 'off',
        'id-length': 'off',
        'import/no-cycle': 'off',
        'no-empty': 'off',
        'no-magic-numbers': 'off',
      },
    },
  ],
  parserOptions: {
    project: './tsconfig.lint.json',
  },
  root: true,
  rules: {
    'no-console': 'off',
  },
}
