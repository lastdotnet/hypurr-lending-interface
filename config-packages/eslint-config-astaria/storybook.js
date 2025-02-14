module.exports = {
  extends: ['./internal/base', 'plugin:storybook/recommended'],
  overrides: [
    {
      files: ['**/*.stories.tsx'],
      rules: {
        '@next/next/no-html-link-for-pages': 'off',
        'no-restricted-exports': 'off',
      },
    },
  ],
  rules: {
    'storybook/prefer-pascal-case': 'off',
  },
};
