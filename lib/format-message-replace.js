const { declare } = require('@babel/helper-plugin-utils');
const { interpolateName } = require('@formatjs/ts-transformer');

module.exports = declare((api) => {
  api.assertVersion(7);

  return {
    name: 'format-message-replace',

    visitor: {
      CallExpression(path) {
        if (
          path.node?.callee?.object?.property?.name === 'intl' &&
          path.node?.callee?.property?.name === 'formatMessage'
        ) {
          path.node.callee.property.name = 't';

          const args = path.node?.arguments;
          const firstHash = args?.[0];
          const valuesHash = args?.[1];
          const defaultMessage = getVariableValue(firstHash, 'defaultMessage');
          const description = getVariableValue(firstHash, 'description');
          const translationId = getVariableValue(firstHash, 'id');

          const idInterpolationPattern = '[sha512:contenthash:base64:6]';

          const id = interpolateName(
            {
              resourcePath: api.File.path,
            },
            idInterpolationPattern,
            {
              content: description
                ? `${defaultMessage}#${description}`
                : defaultMessage,
            }
          );

          path.node.arguments[0] = {
            type: 'StringLiteral',
            value: translationId || id,
          };

          path.node.arguments[1] = valuesHash;
          path.node.arguments[2] = null;
        }
      },
    },
  };
});

const getVariableValue = (args, variable) => {
  return args?.properties?.find?.((p) => p.key?.name === variable)?.value
    ?.value;
};
