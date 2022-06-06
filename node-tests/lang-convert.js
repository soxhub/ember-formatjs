const { expect } = require('chai');

const { createBuilder, createTempDir } = require('broccoli-test-helper');

const LangConvert = require('../lib/lang-convert');

let output;
let input;

async function buildFiles(files) {
  input.write(files);

  const subject = new LangConvert(input.path());
  output = createBuilder(subject);

  await output.build();

  return output.read();
}

describe('Tag Generator', function () {
  beforeEach(async () => {
    input = await createTempDir();
  });

  afterEach(async () => {
    try {
      await input.dispose();
    } finally {
      // do nothing
    }

    if (output) {
      await output.dispose();
    }
  });

  it('convert the format of lang files to ember-intl supported files', async function () {
    const files = await buildFiles({
      'en-us.json': `{
  "+/sgnu": {
    "translation": "Assessment Templates"
  },
  "+5S38p": {
    "translation": "Tasks are not in the same status. No bulk workflow actions can be performed."
  }
}`,
    });

    expect(files).to.have.property('en-us.json');
    expect(files['en-us.json']).to.equal(`{
  "+/sgnu": "Assessment Templates",
  "+5S38p": "Tasks are not in the same status. No bulk workflow actions can be performed."
}`);
  });
});
