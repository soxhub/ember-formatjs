const rule = require('../eslint-plugin/rules/no-message-concatenation');
const RuleTester = require('eslint').RuleTester;

const eslintTester = new RuleTester({
  parserOptions: { ecmaVersion: 2020, sourceType: 'module' },
});

eslintTester.run('no-message-concatenation', rule, {
  valid: [
    'this.intl.formatMessage({ defaultMessage: `Simple multline message` });',
    'this.intl.formatMessage({ defaultMessage: `Not Simple {kind} message`}, { kind: "multiline"});',
    'this.intl.formatMessage({ defaultMessage: `Do you like $?`});',
    'this.intl.formatMessage({ defaultMessage: `Do you like \\${sign}?`}, { sign: "dollar"});',
    'this.intl.formatMessage({ defaultMessage: "Simple message" });',
    'this.intl.formatMessage({ defaultMessage: "Not Simple {kind} message" }, { kind: "inline" });',
  ],
  invalid: [
    {
      code: 'let something = "something"; this.intl.formatMessage({ defaultMessage: `Do you like ${something}?`});',
      output: null,
      errors: [
        'Concatenation of intl messages is not allowed, use ICU syntax to allow dynamic messages.',
      ],
    },
    {
      code: 'let something = "something"; this.intl.formatMessage({ defaultMessage: "Do you like " + something });',
      output: null,
      errors: [
        'Concatenation of intl messages is not allowed, use ICU syntax to allow dynamic messages.',
      ],
    },
    {
      code: 'this.intl.formatMessage({ defaultMessage: "Do you like " + "something?"});',
      output: null,
      errors: [
        'Concatenation of intl messages is not allowed, use ICU syntax to allow dynamic messages.',
      ],
    },
  ],
});
