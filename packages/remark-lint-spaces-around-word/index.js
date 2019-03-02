const rule = require('unified-lint-rule');
const toList = require('unist-util-to-list-of-char');

const TEXT = 0;
const SPACE = 1;
const ENGLISH = 2;
const CHINESE = 3;

function getType(value) {
  if (/[\u4e00-\u9fa5]/.test(value)) return CHINESE;
  if (/[a-zA-Z]/.test(value)) return ENGLISH;
  if (/\s/.test(value)) return SPACE;
  return TEXT;
}

class Traveler {
  constructor(file) {
    this.file = file;
    this.type = TEXT;
    this.error = { };
    this.word = null;
  }

  report() {
    if (this.error.start && this.error.end) {
      this.file.message(`Should have spaces around "${this.word.text}"`, this.word);
    } else if (this.error.start && !this.error.end) {
      this.file.message(`Should have space before "${this.word.text}"`, this.word);
    } else if (this.error.end && !this.error.start) {
      this.file.message(`Should have space after "${this.word.text}"`, this.word);
    }
    this.error = { };
  }

  appendWord(node) {
    this.word = this.word || {
      text: '',
      start: node,
      end: node,
    };
    this.word.end = node;
    this.word.text += node.value;
  }

  setError(prev, curr) {
    if (curr === ENGLISH && prev === CHINESE) {
      this.error.start = true;
    } else if (curr === CHINESE && prev === ENGLISH) {
      this.error.end = true;
    }
  }

  digestWord() {
    this.report();
    this.word = null;
  }

  process(node) {
    const prevType = this.type;
    this.type = getType(node.value);

    this.setError(prevType, this.type);
    if (this.type === ENGLISH) {
      this.appendWord(node);
    } else {
      this.digestWord();
    }
  }

  end() {
    this.digestWord();
  }
}

function processor(tree, file) {
  function callback(list) {
    const traveler = new Traveler(file);
    list.forEach((node) => {
      traveler.process(node);
    });
    traveler.end();
  }
  toList(tree, 'paragraph', callback);
  toList(tree, 'heading', callback);
}

module.exports = rule(
  'remark-lint:spaces-around-word',
  processor,
);
