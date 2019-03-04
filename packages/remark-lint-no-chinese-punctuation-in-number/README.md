# remark-lint-no-chinese-punctuation-in-number

Warn when specific Chinese punctuations found inside number.

## Example

**`valid.md`**

**In**

```markdown
时间是 00:00 分。
总价是 1.23 元。
一共 100,000 元。
```

**Out**

No messages.

**`invalid.md`**

**In**

```markdown
时间是 00：00 分。
一共 100，000 元。
```

**Out**

```text
input.md:1:7: Should not use "：" in number
input.md:2:7: Should not use "，" in number
```

## Install

```sh
npm install remark-lint-no-chinese-punctuation-in-number
```

## Usage

You probably want to use it on the CLI through a config file:

```diff
 ...
 "remarkConfig": {
   "plugins": [
     ...
     "remark-lint",
+    "remark-lint-no-chinese-punctuation-in-number",
     ...
   ]
 }
 ...
```

Or use it on the CLI directly

```sh
remark -u remark-lint -u remark-lint-no-chinese-punctuation-in-number readme.md
```

Or use this on the API:

```diff
 var remark = require('remark');
 var report = require('vfile-reporter');

 remark()
   .use(require('remark-lint'))
+  .use(require('remark-lint-no-chinese-punctuation-in-number'))
   .process('_Emphasis_ and **importance**', function (err, file) {
     console.error(report(err || file));
   });
```

## License

[MIT](https://github.com/laysent/remark-lint-plugins/blob/master/LICENSE) © [LaySent](https://github.com/laysent)
