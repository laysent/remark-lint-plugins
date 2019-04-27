const rule = require('unified-lint-rule');
const remove = require('unist-util-remove');
const toList = require('unist-util-to-list-of-char');

const punctuations = '！!~～.。,，·?？';

class Traveler {
  constructor(file, config) {
    this.file = file;
    this.prev = null;
    this.config = config;
  }

  process(node) {
    const { value } = node;
    if (this.config.indexOf(value) >= 0 && value === this.prev) {
      this.file.message(`Should not repeat "${value}"`, node);
    }
    this.prev = value;
  }

  end() { } // eslint-disable-line class-methods-use-this
}

function processor(tree, file, config = punctuations) {
  function callback(list) {
    const traveler = new Traveler(file, config);
    list.forEach((node) => {
      traveler.process(node);
    });
    traveler.end();
  }
  const withoutCode = remove(tree, 'inlineCode');
  toList(withoutCode, 'paragraph', callback);
  toList(withoutCode, 'heading', callback);
}

module.exports = rule(
  'remark-lint:no-repeat-punctuation',
  processor,
);
