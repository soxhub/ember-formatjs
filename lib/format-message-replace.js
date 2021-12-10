const { declare } = require('@babel/helper-plugin-utils');
const { interpolateName } = require('@formatjs/ts-transformer');

module.exports = declare((api) => {
  api.assertVersion(7);

  return {
    name: 'format-message-replace',

    visitor: {
      CallExpression(path) {
        if (path.node?.callee?.property?.name === 'formatMessage') {
          // throw new Error(Object.keys(api.File));
          path.node.callee.property.name = 't';
          const defaultMessage = path.node?.arguments?.[0]?.properties?.find?.(
            (p) => p.key?.name === 'defaultMessage'
          )?.value?.value;
          const description = path.node?.arguments?.[0]?.properties?.find?.(
            (p) => p.key?.name === 'description'
          )?.value?.value;

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
            value: id,
          };
        }
      },
    },
  };
});
