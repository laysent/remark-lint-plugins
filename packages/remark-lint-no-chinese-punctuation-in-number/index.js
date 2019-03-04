const rule = require('unified-lint-rule');
const visit = require('unist-util-visit');
const toString = require('unist-util-to-string-with-nodes');

const pattern = /\d[：，]\d/g;

function processor(root, file) {
  function callback(tree) {
    const { text, nodes } = toString(tree);
    pattern.lastIndex = -1;
    for (let match = pattern.exec(text); match; match = pattern.exec(text)) {
      const { index } = match;
      file.message(`Should not use "${text[index + 1]}" in number`, nodes[index + 1]);
    }
  }
  visit(root, 'paragraph', callback);
  visit(root, 'heading', callback);
}

module.exports = rule(
  'remark-lint:no-chinese-punctuation-in-number',
  processor,
);
