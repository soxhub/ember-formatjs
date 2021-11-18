const Filter = require('broccoli-persistent-filter');

class LangConvert extends Filter {
  constructor(inputNode, search, replace, options = {}) {
    super(inputNode, {
      annotation: options.annotation,
    });
    this.extensions = ['json'];
    this.targetExtension = 'json';
  }

  processString(content) {
    let parsed = JSON.parse(content);

    let result = {};

    for (let key in parsed) {
      result[key] = parsed[key].defaultMessage;
    }

    return JSON.stringify(result, null, 2);
  }
}

module.exports = LangConvert;
