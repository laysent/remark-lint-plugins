# remark-lint-spaces-around-number

According to
[chinese-document-style-guide](https://github.com/ruanyf/document-style-guide),
one way of organize number and Chinese is to have space in between.
This lint will warn when space is missing in such cases.

## Example

**`valid.md`**

**In**

```markdown
理财产品的收益是 4.0% 左右。
```

**Out**

No messages.

**`invalid.md`**

**In**

```markdown
理财产品的收益是 4.0%左右。
```

**Out**

```text
input.md:1:10-1:13: Should have space after "4.0%"
```

## Install

```sh
npm install remark-lint-spaces-around-number
```

## Usage

You probably want to use it on the CLI through a config file:

```diff
 ...
 "remarkConfig": {
   "plugins": [
     ...
     "remark-lint",
+    "remark-lint-spaces-around-number",
     ...
   ]
 }
 ...
```

Or use it on the CLI directly

```sh
remark -u remark-lint -u remark-lint-spaces-around-number readme.md
```

Or use this on the API:

```diff
 var remark = require('remark');
 var report = require('vfile-reporter');

 remark()
   .use(require('remark-lint'))
+  .use(require('remark-lint-spaces-around-number'))
   .process('_Emphasis_ and **importance**', function (err, file) {
     console.error(report(err || file));
   });
```

## License

[MIT](https://github.com/laysent/remark-lint-plugins/blob/master/license) © [LaySent](https://github.com/laysent)
