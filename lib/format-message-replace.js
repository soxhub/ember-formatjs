const { declare } = require('@babel/helper-plugin-utils');
const { interpolateName } = require('@formatjs/ts-transformer');

module.exports = declare((api) => {
  api.assertVersion(7);

  return {
    name: 'format-message-replace',

    visitor: {
      CallExpression(path) {
        if (path.node?.callee?.property?.name === 'formatMessage') {
          path.node.callee.property.name = 't';

          const args = path.node?.arguments;
          const message = args?.[0];
          let defaultMessage;
          let valuesHash;
          let description;
          let translationId;

          if (message.type === 'StringLiteral') {
            defaultMessage = message.value;
          } else {
            throw new Error(
              `Something is broken with i18n you are missing a default message, ${message?.value}`
            );
          }

          if (args.length === 2) {
            valuesHash = args[1];
            if (
              hasDescription(valuesHash) &&
              !messageHasDescription(defaultMessage)
            ) {
              description = getVariableValue(valuesHash, 'description');
              deleteVariable(valuesHash, 'description');
            }

            if (hasId(valuesHash) && !messageHasId(defaultMessage)) {
              translationId = getVariableValue(valuesHash, 'id');
              deleteVariable(valuesHash, 'id');
            }

            if (valuesHash.properties.length === 0) {
              valuesHash = null;
            }
          }

          if (args.length === 3) {
            valuesHash = args[1];
            const optionsHash = args[2];

            description = getVariableValue(optionsHash, 'description');
            translationId = getVariableValue(optionsHash, 'id');
          }

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

const deleteVariable = (args, variable) => {
  const idx = args?.properties?.findIndex?.((p) => p.key?.name === variable);
  return args.properties.splice(idx, 1);
};

const hasDescription = (args) => {
  return args.properties.find((p) => p.key.name === 'description');
};

const hasId = (args) => {
  return args.properties.find((p) => p.key.name === 'id');
};

const messageHasDescription = (message) => {
  return message.includes('{description}');
};

const messageHasId = (message) => {
  return message.includes('{id}');
};
