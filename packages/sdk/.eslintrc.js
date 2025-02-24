module.exports = {
  extends: ['astaria/core'],
  overrides: [
    {
      files: ['src/abi/**/*'],
      rules: {
        'import/no-unused-modules': 'off',
      },
    },
  ],
  parserOptions: {
    project: true,
  },
  root: true,
}
