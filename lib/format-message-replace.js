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
  const property = args?.properties?.find?.((p) => p.key?.name === variable);
  const propertyValue = property?.value;

  let value = propertyValue?.value;
  if (propertyValue?.type === 'TemplateLiteral') {
    // For a string type TemplateLiteral we only take first quasi
    // because dynamic expressions / concatenation inside a message are not allowed anyways.
    value = propertyValue.quasis[0].value.cooked;
  }

  // Replicates what formatjs does by default
  // Formatjs has an option 'preserveWhitespace' which is `false` by default
  // We need to replicate this to also make certain strings equal regardless of their format.
  // See `messageWithBackticks` and `messageWithMultilineBackticks` inside ../node-tests/fixtures/format-message-replace/output
  return value?.trim().replace(/\s+/gm, ' ');
};
