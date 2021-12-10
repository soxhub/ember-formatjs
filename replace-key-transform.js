'use strict';
const { interpolateName } = require('@formatjs/ts-transformer');

/* eslint-env node */

module.exports = function (idInterpolationPattern) {
  return function (env) {
    let fileName = env.meta.moduleName;

    function transformHelper(node) {
      if (node.path.original === 'format-message') {
        const defaultMessage = node.params[0]?.original;
        const description = node.params[1]?.original;
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
