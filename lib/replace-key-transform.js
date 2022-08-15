'use strict';
const { interpolateName } = require('@formatjs/ts-transformer');

/* eslint-env node */

module.exports = function (idInterpolationPattern) {
  return function (env) {
    let fileName = env.meta.moduleName;

    function transformHelper(node) {
      if (node.path.original === 'format-message') {
        // defaultMessage and description were trimmed and multiple white spaces were replaced with a single space,
        // because generated id has to be the same no matter what is the indentation and new lines.
        // id has to be generated the same way in soxhub/formatjs/hbs_extractor!!!!!!!!!!!!!!
        const defaultMessage = node.params[0]?.original
          ?.trim()
          .replace(/\s+/gm, ' ');
        const description = node.params[1]?.original
          ?.trim()
          .replace(/\s+/gm, ' ');
        const id = interpolateName(
          {
            resourcePath: fileName,
          },
          idInterpolationPattern,
          {
            content: description
              ? `${defaultMessage}#${description}`
              : defaultMessage,
          }
        );
        node.path.original = 't';
        node.path.parts[0] = 't';
        node.params = [node.params[0]];
        node.params[0].value = node.params[0].original = id;
      }
    }

    return {
      name: 'replace-key-transform',

      visitor: {
        MustacheStatement: transformHelper,
        SubExpression: transformHelper,
      },
    };
  };
};

module.exports.baseDir = function () {
  return __dirname;
};

module.exports.cacheKey = function () {
  return 'replace-key-transform';
};
