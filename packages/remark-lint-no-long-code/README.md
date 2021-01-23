# remark-lint-no-long-code

Warn when any line in code block is too long. By default, the accepted maximum length of each line in code block is 100 characters. You may configure the plugin by

1. specifying the maximum accepted length of each line, default `100`

```json
{
  "length": 100
}
```

2. specifying any type of code block that exclude from rule check, default `[]`

```json
{
  "exclude": ["dot", "smali"]
}
```

3. specifying the size of tab, default `4`

```json
{
  "tabWidth": 4
}
```

## Example

**`valid.md`**

**In**

``````markdown
```javascript
console.log("short line");
```
``````

**Out**

No messages.

**`invalid.md`**

**In**

``````markdown
# heading

```javascript
console.log("this line contains 101 characters: extra extra extra extra extra extra extra extra ..."),
console.log("short line")
console.log("this line contains 101 characters: extra extra extra extra extra extra extra extra ...")
```

footer with `long long long long long long long long long long long long long long long long long long long long long long long long code`
``````

**Out**

```text
input.md:4:1-4:101: Maximum length of each code line is 100, but received 101
input.md:6:1-6:101: Maximum length of each code line is 100, but received 101
```

## Install

```sh
npm install remark-lint-no-long-code
```

## Usage

You probably want to use it on the CLI through a config file:

```diff
 ...
 "remarkConfig": {
   "plugins": [
     ...
     "remark-lint",
+    ["remark-lint-no-long-code", { "length": 100 }]
     ...
   ]
 }
 ...
```

Or use it on the CLI directly

```sh
remark -u remark-lint -u remark-lint-no-long-code readme.md
```

Or use this on the API:

```diff
 var remark = require('remark');
 var report = require('vfile-reporter');

 remark()
   .use(require('remark-lint'))
+  .use(require('remark-lint-no-long-code'), { length: 100 })
   .process('_Emphasis_ and **importance**', function (err, file) {
     console.error(report(err || file));
   });
```

## License

[MIT](https://github.com/laysent/remark-lint-plugins/blob/master/LICENSE) © [LaySent](https://github.com/laysent)
