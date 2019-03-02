const remark = require('remark');
const vfile = require('to-vfile');
const rule = require('.');

describe('match-punctuation', () => {
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
  const pairs = [
    '()',
    '<>',
    '{}',
    '[]',
    '“”',
    '『』',
    '（）',
    '《》',
    '「」',
    '【】',
    '‘’',
  ];
  pairs.forEach(([left, right]) => {
    it(`should pass when ${left} & ${right} matches`, () => {
      const markdown = `子曰：${left}学而时习之，不亦说乎${right}`;
      return process(markdown).then((messages) => {
        expect(messages).toEqual([]);
      });
    });
    it(`should pass when nested ${left} & ${right} matches`, () => {
      const markdown = `外层${left}里层${left}更里层${right}里层${right}外层`;
      return process(markdown).then((messages) => {
        expect(messages).toEqual([]);
      });
    });
    it('should pass when text is wrapped', () => {
      const markdown = `外层**${left}**强调__${left}__[链接](link)~~${right}~~删除_${right}_外层`;
      return process(markdown).then((messages) => {
        expect(messages).toEqual([]);
      });
    });
    it(`should fail when ${right} is missing`, () => {
      const markdown = `子曰：${left}学而时习之，不亦说乎！`;
      return process(markdown).then((messages) => {
        expect(messages).toEqual([
          `input.md:1:4: "${left}" is used without matching "${right}"`,
        ]);
      });
    });
    it(`should fail when ${right} is used before ${left}`, () => {
      const markdown = `子曰：${right}学而时习之，不亦说乎${left}`;
      return process(markdown).then((messages) => {
        expect(messages).toEqual([
          `input.md:1:4: "${right}" is used without matching "${left}"`,
          `input.md:1:15: "${left}" is used without matching "${right}"`,
        ]);
      });
    });
  });
});
