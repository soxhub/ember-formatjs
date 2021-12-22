'use strict';

const { join } = require('path');
const LangConvert = require('./lib/lang-convert');
const { addPlugin, hasPlugin } = require('ember-cli-babel-plugin-helpers');
const Plugin = require.resolve('./lib/format-message-replace');

module.exports = {
  name: require('./package').name,

  treeForTranslations() {
    const appPrefix = join(this.project.configPath(), '../..');

    return new LangConvert(join(appPrefix, 'lang'));
  },

  included() {
    this._super.included.apply(this, arguments);

    let current = this;
    let app;
    do {
      app = current.app || app;
    } while (current.parent.parent && (current = current.parent));

    if (!hasPlugin(app, Plugin)) {
      addPlugin(app, Plugin);
    }

    // we can't use the setupPreprocessorRegistry() because there is no access to app.options
    this._setupPreprocessorRegistry(app);
  },

  _setupPreprocessorRegistry(app) {
    let plugin = this._buildReplacePlugin(app);
    plugin.parallelBabel = {
      requireFile: __filename,
      buildUsing: '_buildReplacePlugin',
      params: {},
    };

    app.registry.add('htmlbars-ast-plugin', plugin);
  },

  _buildReplacePlugin(app) {
    let KeyTransform = require('./lib/replace-key-transform');

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
