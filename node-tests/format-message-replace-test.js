const { join } = require('path');
const pluginTester = require('babel-plugin-tester').default;
const formatMessageReplace = require('../lib/format-message-replace');

pluginTester({
  plugin: formatMessageReplace,
  pluginName: 'format message replace',
  fixtures: join(__dirname, 'fixtures'),
});
