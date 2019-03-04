const remark = require('remark');
const toList = require('.');

describe('unist-util-to-list-of-char', () => {
  it('should iterate through text', () => {
    const markdown = 'ok';
    const tree = remark().parse(markdown);
    let final;
    toList(tree, (list) => {
      final = list;
    });
    expect(final).toEqual([
      {
        value: 'o', column: 1, line: 1, offset: 0,
      },
      {
        value: 'k', column: 2, line: 1, offset: 1,
      },
    ]);
  });
  it('should iterate through text in nested nodes', () => {
    const markdown = 'o**[k](url)**';
    const tree = remark().parse(markdown);
    let final;
    toList(tree, (list) => {
      final = list;
    });
    expect(final).toEqual([
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
    let final;
    toList(tree, (list) => {
      final = list;
    });
    expect(final).toEqual([
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
  it('should process only parital of tree when test is provided', () => {
    const markdown = [
      '1',
      '',
      '2',
    ].join('\n');
    const tree = remark().parse(markdown);
    const result = [];
    toList(tree, 'paragraph', (list) => {
      result.push(list);
    });
    expect(result).toEqual([
      [
        {
          value: '1', column: 1, line: 1, offset: 0,
        },
      ],
      [
        {
          value: '2', column: 1, line: 3, offset: 3,
        },
      ],
    ]);
  });
});
