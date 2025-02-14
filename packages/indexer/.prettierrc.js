const astariaPrettierConfig = require('prettier-config-astaria/prettier');

module.exports = {
  ...astariaPrettierConfig,
  importOrderParserPlugins: ['typescript', 'decorators-legacy'],
};
