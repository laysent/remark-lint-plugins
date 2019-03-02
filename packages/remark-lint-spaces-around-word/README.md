# remark-lint-spaces-around-word

According to
[chinese-document-style-guide](https://github.com/ruanyf/document-style-guide),
there should be spaces between English word and Chinese characters.
This lint will warn when space is missing in such cases.

## Example

**`valid.md`**

**In**

```markdown
这是一份中文 API 文档。
```

**Out**

No messages.

**`invalid.md`**

**In**

```markdown
这是一份中文API文档。
```

**Out**

```text
input.md:1:7-1:9: Should have spaces around "API"
```

## Install

```sh
npm install remark-lint-spaces-around-word
```

## Usage

You probably want to use it on the CLI through a config file:

```diff
 ...
 "remarkConfig": {
   "plugins": [
     ...
     "remark-lint",
+    "remark-lint-spaces-around-word",
     ...
   ]
 }
 ...
```

Or use it on the CLI directly

```sh
remark -u remark-lint -u remark-lint-spaces-around-word readme.md
```

Or use this on the API:

```diff
 var remark = require('remark');
 var report = require('vfile-reporter');

 remark()
   .use(require('remark-lint'))
+  .use(require('remark-lint-spaces-around-word'))
   .process('_Emphasis_ and **importance**', function (err, file) {
     console.error(report(err || file));
   });
```

## License

[MIT](https://github.com/laysent/remark-lint-plugins/blob/master/license) © [LaySent](https://github.com/laysent)
