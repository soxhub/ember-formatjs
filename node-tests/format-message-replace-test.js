const { join } = require('path');
const pluginTester = require('babel-plugin-tester').default;
const FormatMessageReplace = require('../lib/format-message-replace');

pluginTester({
  plugin: FormatMessageReplace({
    idInterpolationPattern: '[sha512:contenthash:base64:6]',
    preserveWhitespace: false,
  }),
  pluginName: 'format message replace',
  fixtures: join(__dirname, 'fixtures'),
});
