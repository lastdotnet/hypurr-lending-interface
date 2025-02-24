module.exports = {
  arrowParens: 'always',
  importOrder: [
    '<THIRD_PARTY_MODULES>',
    'assets|chains|common|contracts-internal|notifications|ofac|points|sdk|indexer',
    '^[./]',
  ],
  importOrderGroupNamespaceSpecifiers: true,
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  overrides: [
    {
      files: ['*.json', '.*rc'],
      options: {
        parser: 'json5',
        quoteProps: 'preserve',
        singleQuote: false,
        trailingComma: 'none',
      },
    },
  ],
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  printWidth: 80,
  requirePragma: false,
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  useTabs: false,
}
