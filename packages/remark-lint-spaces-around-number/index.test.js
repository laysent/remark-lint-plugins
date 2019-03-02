const remark = require('remark');
const vfile = require('to-vfile');
const rule = require('.');

describe('remark-lint-spaces-around-number', () => {
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
    const markdown = '中文 123 中文。';
    return process(markdown).then((messages) => {
      expect(messages).toEqual([]);
    });
  });
  it('should fail when spaces missing around word', () => {
    const markdown = [
      '这是1.1份中文文档。',
      '',
      '这里的数字在最后2',
      '',
      '3在最前面。',
    ].join('\n');
    return process(markdown).then((messages) => {
      expect(messages).toEqual([
        'input.md:1:3-1:5: Should have spaces around "1.1"',
        'input.md:3:9-3:9: Should have space before "2"',
        'input.md:5:1-5:1: Should have space after "3"',
      ]);
    });
  });
  it('should fail when missing space around english link', () => {
    const markdown = '这是一份中文[123](url)文档。';
    return process(markdown).then((messages) => {
      expect(messages).toEqual([
        'input.md:1:8-1:10: Should have spaces around "123"',
      ]);
    });
  });
  it('should fail when missing space after %', () => {
    const markdown = '理财产品的收益是 4.0%左右。';
    return process(markdown).then((messages) => {
      expect(messages).toEqual([
        'input.md:1:10-1:13: Should have space after "4.0%"',
      ]);
    });
  });
  it('should not fail when % is not part of number', () => {
    const markdown = '这是一串分隔符%%%%%%%分割结束';
    return process(markdown).then((messages) => {
      expect(messages).toEqual([]);
    });
  });
  it('should fail when missing space around number in heading', () => {
    const markdown = [
      '# 这是1个标题',
      '',
      '正文',
    ].join('\n');
    return process(markdown).then((messages) => {
      expect(messages).toEqual([
        'input.md:1:5-1:5: Should have spaces around "1"',
      ]);
    });
  });
});
