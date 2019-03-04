const remark = require('remark');
const vfile = require('to-vfile');
const rule = require('.');

describe('no-chinese-punctuation-in-number', () => {
  function process(markdown, config) {
    return new Promise((resolve, reject) => {
      remark()
        .use(rule, config)
        .process(vfile({ path: 'input.md', contents: markdown }), (error, file) => {
          if (error) reject(error);
          else resolve(file.messages.map(String));
        });
    });
  }
  it('should pass when no Chinese punctuation found in number', () => {
    const markdown = '现在是 12:34，当前的报价是 $100,000 元';
    return process(markdown).then((messages) => {
      expect(messages).toEqual([]);
    });
  });
  it('should fail when ： is used in number', () => {
    const markdown = '现在是 10：00 分。';
    return process(markdown).then((messages) => {
      expect(messages).toEqual([
        'input.md:1:7: Should not use "：" in number',
      ]);
    });
  });
  it('should fail when ， is used in number', () => {
    const markdown = '单价是 100，000，000 元。';
    return process(markdown).then((messages) => {
      expect(messages).toEqual([
        'input.md:1:8: Should not use "，" in number',
        'input.md:1:12: Should not use "，" in number',
      ]);
    });
  });
});
