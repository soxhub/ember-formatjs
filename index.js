'use strict';

const { join } = require('path');
const LangConvert = require('./lib/lang-convert');
const { addPlugin, hasPlugin } = require('ember-cli-babel-plugin-helpers');
const Plugin = require('./lib/format-message-replace');

module.exports = {
  name: require('./package').name,

  isDevelopingAddon() {
    return true;
  },

  treeForTranslations() {
    if (!this.shouldTranspile(this.app)) {
      return;
    }

    const appPrefix = join(this.project.configPath(), '../..');

    return new LangConvert(join(appPrefix, 'locale'));
  },

  included() {
    this._super.included.apply(this, arguments);

    let app;
    let current = this;
    do {
      app = current.app || app;
    } while (current.parent.parent && (current = current.parent));

    if (!this.shouldTranspile(app)) {
      this.ui.writeLine('Do not transpile i18n with ember-formatjs');
      return;
    }

    this.ui.writeLine('Transpile i18n with ember-formatjs');

    const FormatMessageReplacePlugin = Plugin(this.addonOptions(app));

    if (!hasPlugin(app, FormatMessageReplacePlugin)) {
      addPlugin(app, FormatMessageReplacePlugin);
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

    return {
      name: 'replace-key-transform',
      plugin: KeyTransform(this.addonOptions(app).idInterpolationPattern),
      baseDir: KeyTransform.baseDir,
      cacheKey: KeyTransform.cacheKey,
    };
  },

  shouldTranspile(app) {
    const shouldTranspile = process.env?.TRANSPILE_I18N;
    return app.isProduction || shouldTranspile;
  },

  addonOptions(app) {
    const addonOptions = (app.options ?? {})['ember-formatjs'] || {};
    const defaultOptions = {
      idInterpolationPattern: '[sha512:contenthash:base64:6]',
      preserveWhitespace: false,
    };

    return Object.assign({}, defaultOptions, addonOptions);
  },
};
