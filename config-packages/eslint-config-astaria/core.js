// Split import out due to a conflict with import in next/core-web-vitals

module.exports = {
  extends: ['./internal/core-base', 'plugin:import/recommended'],
  plugins: ['import'],
  rules: {
    'import/first': 'error',
    'import/no-cycle': 'error',
    'import/no-duplicates': 'error',
    'import/no-unresolved': 'error',
    'import/no-unused-modules': [2, { unusedExports: true }],
  },
}
