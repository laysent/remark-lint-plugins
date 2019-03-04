const remark = require('remark');
const vfile = require('to-vfile');
const rule = require('.');

describe('no-repeat-punctuation', () => {
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
  it('should pass when punctuation not repeat', () => {
    const markdown = '好好学习，天天向上。';
    return process(markdown).then((messages) => {
      expect(messages).toEqual([]);
    });
  });
  ['！', '!', '~', '～', '.', '。', ',', '，', '·', '?', '？'].forEach((punctuation) => {
    it(`should fail when ${punctuation} repeat`, () => {
      const markdown = `好好学习，天天向上${punctuation}${punctuation}${punctuation}`;
      return process(markdown).then((messages) => {
        expect(messages).toEqual([
          `input.md:1:11: Should not repeat "${punctuation}"`,
          `input.md:1:12: Should not repeat "${punctuation}"`,
        ]);
      });
    });
  });
  it('should use provided puncutation list', () => {
    const markdown = '好好学习！！！天天向上。。。';
    return process(markdown, '。').then((messages) => {
      expect(messages).toEqual([
        'input.md:1:13: Should not repeat "。"',
        'input.md:1:14: Should not repeat "。"',
      ]);
    });
  });
});
