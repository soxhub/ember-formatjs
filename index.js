'use strict';

const { join } = require('path');
const LangConvert = require('./lib/lang-convert');

module.exports = {
  name: require('./package').name,

  treeForTranslations() {
    let appPrefix = join(this.project.configPath(), '../..');

    return new LangConvert(join(appPrefix, 'lang'));
  },
};
