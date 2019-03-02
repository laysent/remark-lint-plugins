const remark = require('remark');
const vfile = require('to-vfile');
const rule = require('.');

describe('remark-lint-spaces-around-word', () => {
  function process(markdown) {
    return new Promise((resolve, reject) => {
      remark()
        .use(rule)
        .process(vfile({ path: 'input.md', contents: markdown }), (error, file) => {
          if (error) reject(error);
          else resolve(file.messages.map(String));
        });
    });
  }
  it('should pass when spaces are around word', () => {
    const markdown = '中文 hello world 中文。';
    return process(markdown).then((messages) => {
      expect(messages).toEqual([]);
    });
  });
  it('should fail when spaces missing around word', () => {
    const markdown = [
      '这是一份中文API文档。',
      '',
      '这里有另外一个error',
      '',
      'WARNING在最前面。',
    ].join('\n');
    return process(markdown).then((messages) => {
      expect(messages).toEqual([
        'input.md:1:7-1:9: Should have spaces around "API"',
        'input.md:3:8-3:12: Should have space before "error"',
        'input.md:5:1-5:7: Should have space after "WARNING"',
      ]);
    });
  });
  it('should fail when missing space around english link', () => {
    const markdown = '这是一份中文[API](url)文档。\n然后换行看看';
    return process(markdown).then((messages) => {
      expect(messages).toEqual([
        'input.md:1:8-1:10: Should have spaces around "API"',
      ]);
    });
  });
  it('should fail when missing space around english in heading', () => {
    const markdown = [
      '# 这是一个Wrong标题',
      '',
      '正文',
    ].join('\n');
    return process(markdown).then((messages) => {
      expect(messages).toEqual([
        'input.md:1:7-1:11: Should have spaces around "Wrong"',
      ]);
    });
  });
});
