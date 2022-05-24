'use strict';

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'disallow concatenation inside translations',
      category: 'intl',
      recommended: true,
      url: 'https://github.com/soxhub/ember-formatjs',
    },
    fixable: null,
    schema: [],
  },

  create(context) {
    const report = function (node) {
      const message =
        'Concatenation of intl messages is not allowed, use ICU syntax to allow dynamic messages.';
      context.report({ node, message });
    };

    return {
      CallExpression(node) {
        const isIntl = node.callee.object?.property?.name === 'intl';
        const isFormatMessage = node.callee?.property?.name === 'formatMessage';

        if (isIntl && isFormatMessage) {
          const firstArg = node.arguments?.[0].properties?.[0].value;

          if (
            firstArg &&
            firstArg.type === 'BinaryExpression' &&
            firstArg.operator === '+'
          ) {
            report(node);
          }

          if (
            firstArg &&
            firstArg.type === 'TemplateLiteral' &&
            firstArg.expressions.filter(
              (expression) => expression.type === 'Identifier'
            ).length > 0
          ) {
            report(node);
          }
        }
      },
    };
  },
};
