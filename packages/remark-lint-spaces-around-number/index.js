const rule = require('unified-lint-rule');
const toList = require('unist-util-to-list-of-char');

const TEXT = 0;
const NUMBER = 1;
const SPACE = 2;
const CHINESE = 3;

function getType(prev, curr) {
  if (/[\u4e00-\u9fa5]/.test(curr)) return CHINESE;
  if (/\s/.test(curr)) return SPACE;
  if (/\d/.test(curr)) return NUMBER;
  if ((curr === '%' || curr === '.') && /\d/.test(prev)) {
    return NUMBER;
  }
  return TEXT;
}

class Traveler {
  constructor(file) {
    this.file = file;
    this.type = TEXT;
    this.error = { };
    this.number = null;
  }

  report() {
    if (this.error.start && this.error.end) {
      this.file.message(`Should have spaces around "${this.number.text}"`, this.number);
    } else if (this.error.start && !this.error.end) {
      this.file.message(`Should have space before "${this.number.text}"`, this.number);
    } else if (this.error.end && !this.error.start) {
      this.file.message(`Should have space after "${this.number.text}"`, this.number);
    }
    this.error = { };
  }

  appendNumber(node) {
    this.number = this.number || {
      text: '',
      start: node,
      end: node,
    };
    this.number.end = node;
    this.number.text += node.value;
  }

  setError(prev, curr) {
    if (curr === NUMBER && prev === CHINESE) {
      this.error.start = true;
    } else if (prev === NUMBER && curr === CHINESE) {
      this.error.end = true;
    }
  }

  digestNumber() {
    this.report();
    this.number = null;
  }

  process(node) {
    const prevType = this.type;
    this.type = getType(this.prevText, node.value);

    this.setError(prevType, this.type);
    if (this.type === NUMBER) {
      this.appendNumber(node);
    } else if (prevType === NUMBER) {
      this.digestNumber();
    }

    this.prevText = node.value;
  }

  end() {
    this.digestNumber();
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
  'remark-lint:spaces-around-number',
  processor,
);
