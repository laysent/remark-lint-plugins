const remark = require('remark');
const toString = require('.');

describe('unist-util-to-string-with-nodes', () => {
  it('should provide text with nodes', () => {
    const markdown = 'ok';
    const tree = remark().parse(markdown);
    const { text, nodes } = toString(tree);
    expect(text).toBe(markdown);
    expect(nodes).toEqual([
      {
        value: 'o', column: 1, line: 1, offset: 0,
      },
      {
        value: 'k', column: 2, line: 1, offset: 1,
      },
    ]);
  });
  it('should provide nested text with nodes', () => {
    const markdown = 'o**[k](url)**';
    const tree = remark().parse(markdown);
    const { text, nodes } = toString(tree);
    expect(text).toBe('ok');
    expect(nodes).toEqual([
      {
        value: 'o', column: 1, line: 1, offset: 0,
      },
      {
        value: 'k', column: 5, line: 1, offset: 4,
      },
    ]);
  });
  it('should handle newline', () => {
    const markdown = [
      'o',
      '__k__',
    ].join('\n');
    const tree = remark().parse(markdown);
    const { text, nodes } = toString(tree);
    expect(text).toBe('o\nk');
    expect(nodes).toEqual([
      {
        value: 'o', column: 1, line: 1, offset: 0,
      },
      {
        value: '\n', column: 2, line: 1, offset: 1,
      },
      {
        value: 'k', column: 3, line: 2, offset: 4,
      },
    ]);
  });
});
