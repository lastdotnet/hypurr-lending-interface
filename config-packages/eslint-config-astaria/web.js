module.exports = {
  extends: [
    './internal/core-base',
    'next/core-web-vitals',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
  ],
  overrides: [
    {
      files: ['e2e/*'],
      rules: {
        'no-relative-import-paths/no-relative-import-paths': 'off',
      },
    },
    {
      files: [
        'src/app/default.tsx',
        'src/app/error.tsx',
        'src/app/global-error.tsx',
        'src/app/layout.tsx',
        'src/app/manifest.ts',
        'src/app/not-found.tsx',
        'src/app/page.tsx',
        'src/app/**/default.tsx',
        'src/app/**/error.tsx',
        'src/app/**/layout.tsx',
        'src/app/**/not-found.tsx',
        'src/app/**/page.tsx',
      ],
      rules: {
        'no-restricted-exports': 'off',
      },
    },
  ],
  plugins: [
    'jsx-a11y',
    'no-relative-import-paths',
    'react',
    'react-hooks',
    'validate-jsx-nesting',
  ],
  rules: {
    '@next/next/no-server-import-in-page': 'off',
    'import/first': 'error',
    'import/no-cycle': 'error',
    'import/no-duplicates': 'error',
    'import/no-unresolved': 'error',
    'no-relative-import-paths/no-relative-import-paths': [
      'error',
      { allowSameFolder: false, rootDir: 'src' },
    ],
    'react/jsx-curly-brace-presence': [
      'error',
      { children: 'never', propElementValues: 'always', props: 'never' },
    ],
    'react/jsx-no-leaked-render': ['error', { validStrategies: ['ternary'] }],
    'react/jsx-no-useless-fragment': 'error',
    'react/jsx-sort-props': [
      'error',
      {
        ignoreCase: true,
        reservedFirst: true,
      },
    ],
    'react/no-array-index-key': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'validate-jsx-nesting/no-invalid-jsx-nesting': 'error',
  },
};
