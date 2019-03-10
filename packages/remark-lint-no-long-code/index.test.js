const remark = require('remark');
const vfile = require('to-vfile');
const rule = require('.');

describe('no-long-code', () => {
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
  it('should pass when lines in code are not long', () => {
    const markdown = [
      '```javascript',
      'console.log("not long");',
      'console.log("not long");',
      'console.log("not long");',
      '```',
    ].join('\n');
    return process(markdown).then((messages) => {
      expect(messages).toEqual([]);
    });
  });
  it('should fail when lines in code are too long', () => {
    const markdown = [
      '# heading',
      '',
      '```javascript',
      'console.log("this line contains 101 characters: extra extra extra extra extra extra extra extra ...")',
      'console.log("short line")',
      'console.log("this line contains 101 characters: extra extra extra extra extra extra extra extra ...")',
      '```',
      '',
      'footer with `long long long long long long long long long long long long long long long long long long long long long long long long code`',
    ].join('\n');
    return process(markdown).then((messages) => {
      expect(messages).toEqual([
        'input.md:4:1-4:101: Maximum length of each code line is 100, but received 101',
        'input.md:6:1-6:101: Maximum length of each code line is 100, but received 101',
      ]);
    });
  });
  it('should fail when lines in code are longer than configured length', () => {
    const markdown = [
      '# heading',
      '',
      '```javascript',
      'console.log("short line");',
      '```',
    ].join('\n');
    return process(markdown, { length: 25 }).then((messages) => {
      expect(messages).toEqual([
        'input.md:4:1-4:26: Maximum length of each code line is 25, but received 26',
      ]);
    });
  });
  it('should pass when exclude code has long lines', () => {
    const markdown = [
      '```smali',
      'this line contains 101 characters: extra extra extra extra extra extra extra extra extra extra etc...',
      'this line contains 101 characters: extra extra extra extra extra extra extra extra extra extra etc...',
      'this line contains 101 characters: extra extra extra extra extra extra extra extra extra extra etc...',
      '```',
    ].join('\n');
    return process(markdown, { exclude: ['smali'] }).then((messages) => {
      expect(messages).toEqual([]);
    });
  });
  it('should consider tab as 4 width character by default', () => {
    const markdown = [
      '```javascript',
      'console.log("\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t 18 tabs before");',
      '```',
    ].join('\n');
    return process(markdown).then((messages) => {
      expect(messages).toEqual([
        'input.md:2:1-2:49: Maximum length of each code line is 100, but received 103',
      ]);
    });
  });
  it('should be able to change the tab size by configuration', () => {
    const markdown = [
      '```javascript',
      'console.log("\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t 34 tabs before");',
      '```',
    ].join('\n');
    return process(markdown, { tabWidth: 2 }).then((messages) => {
      expect(messages).toEqual([
        'input.md:2:1-2:67: Maximum length of each code line is 100, but received 103',
      ]);
    });
  });
});
