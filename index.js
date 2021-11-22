'use strict';

const { join } = require('path');
const LangConvert = require('./lib/lang-convert');

module.exports = {
  name: require('./package').name,

  treeForTranslations() {
    let appPrefix = join(this.project.configPath(), '../..');

    return new LangConvert(join(appPrefix, 'lang'));
  },

  included(appOrParent) {
    this._super.included.apply(this, arguments);

    // we can't use the setupPreprocessorRegistry() because there is no access to app.options
    this._setupPreprocessorRegistry(appOrParent.registry);
  },

  _setupPreprocessorRegistry(registry) {
    let plugin = this._buildReplacePlugin();
    plugin.parallelBabel = {
      requireFile: __filename,
      buildUsing: '_buildReplacePlugin',
      params: {},
    };

    registry.add('htmlbars-ast-plugin', plugin);
  },

  _buildReplacePlugin() {
    let KeyTransform = require('./replace-key-transform');
    let app = this._findHost();

    let idInterpolationPattern =
      (app.options ?? {})['ember-formatjs']?.idInterpolationPattern ??
      '[sha512:contenthash:base64:6]';

    return {
      name: 'replace-key-transform',
      plugin: KeyTransform(idInterpolationPattern),
      baseDir: KeyTransform.baseDir,
      cacheKey: KeyTransform.cacheKey,
    };
  },
};
