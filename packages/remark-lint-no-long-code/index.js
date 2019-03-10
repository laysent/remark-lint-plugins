const rule = require('unified-lint-rule');
const visit = require('unist-util-visit');

function getSpaces(num) {
  let ret = '';
  for (let i = 0; i < num; i += 1) {
    ret += ' ';
  }
  return ret;
}

function processor(tree, file, config = { }) {
  const exclude = config.exclude || [];
  const maxLength = config.length || 100;
  const tabWidth = config.tabWidth || 4;
  const tabs = getSpaces(tabWidth);
  function visitor(node) {
    const language = node.lang;
    if (exclude.indexOf(language) >= 0) return;
    const lines = node.value.split('\n');
    const startLine = node.position.start.line + 1;
    const startOffset = node.position.start.offset || 0;
    let offset = startOffset;
    lines.forEach((line, index) => {
      const tabConverted = line.replace(/\t/g, tabs);
      const { length } = tabConverted;
      if (length > maxLength) {
        file.message(`Maximum length of each code line is ${maxLength}, but received ${length}`, {
          start: {
            line: startLine + index,
            column: 0,
            offset,
          },
          end: {
            line: startLine + index,
            column: line.length,
            offset: offset + line.length,
          },
        });
      }
      offset += line.length + 1;
    });
  }
  visit(tree, 'code', visitor);
}

module.exports = rule(
  'remark-lint:no-long-code',
  processor,
);
