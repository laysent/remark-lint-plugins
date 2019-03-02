# remark-preset-ling

remark preset for linting English & Chinese markdown documents.

## Rules

This preset configures [`remark-lint`](https://github.com/remarkjs/remark-lint) with the following rules:

| Rule | Settings |
| ---- | -------- |
| `remark-lint-blockquote-indentation` | |
| `remark-lint-checkbox-character-style` | |
| `remark-lint-checkbox-content-indent` | checked: `'x'`; unchecked: `' '` |
| `remark-lint-code-block-style` | `fenced` |
| `remark-lint-definition-case` | |
| `remark-lint-definition-spacing` | |
| `remark-lint-emphasis-marker` | `_` |
| `remark-lint-fenced-code-flag` | allowEmpty: `false` |
| `remark-lint-fenced-code-marker` | `\`` |
| `remark-lint-file-extension` | `md` |
| `remark-lint-final-definition` | |
| `remark-lint-final-newline` | |
| `remark-lint-first-heading-level` | `2` |
| `remark-lint-heading-increment` | |
| `remark-lint-heading-style` | `atx` |
| `remark-lint-linebreak-style` | `unix` |
| `remark-lint-link-title-style` | `'` |
| `remark-lint-list-item-bullet-indent` | |
| `remark-lint-list-item-content-indent` | |
| `remark-lint-list-item-indent` | `space` |
| `remark-lint-list-item-spacing` | checkBlanks: `true` |
| `remark-lint-match-punctuation` | `60` |
| `remark-lint-maximum-heading-length` | |
| `remark-lint-no-auto-link-without-protocol` | |
| `remark-lint-no-blockquote-without-marker` | |
| `remark-lint-no-consecutive-blank-lines` | |
| `remark-lint-no-duplicate-definitions` | |
| `remark-lint-no-duplicate-headings-in-section` | |
| `remark-lint-no-empty-url` | |
| `remark-lint-no-file-name-articles` | |
| `remark-lint-no-file-name-consecutive-dashes` | |
| `remark-lint-no-file-name-irregular-characters` | `\\.a-zA-Z0-9-` |
| `remark-lint-no-file-name-mixed-case` | |
| `remark-lint-no-file-name-outer-dashes` | |
| `remark-lint-no-heading-content-indent` | |
| `remark-lint-no-heading-indent` | |
| `remark-lint-no-heading-like-paragraph` | |
| `remark-lint-no-heading-punctuation` | `.,;:!?。，；：！？` |
| `remark-lint-no-inline-padding` | |
| `remark-lint-no-literal-urls` | |
| `remark-lint-no-missing-blank-lines` | exceptTightLists: `true` |
| `remark-lint-no-multiple-toplevel-headings` | `1` |
| `remark-lint-no-paragraph-content-indent` | |
| `remark-lint-no-reference-like-url` | |
| `remark-lint-no-shell-dollars` | |
| `remark-lint-no-shortcut-reference-image` | |
| `remark-lint-no-shortcut-reference-link` | |
| `remark-lint-no-table-indentation` | |
| `remark-lint-no-tabs` | |
| `remark-lint-no-undefined-references` | |
| `remark-lint-no-unused-definitions` | |
| `remark-lint-ordered-list-marker-style` | `.` |
| `remark-lint-ordered-list-marker-value` | `ordered` |
| `remark-lint-rule-style` | `---` |
| `remark-lint-spaces-around-number` | |
| `remark-lint-spaces-around-word` | |
| `remark-lint-strong-marker` | `*` |
| `remark-lint-table-cell-padding` | `padded` |
| `remark-lint-table-pipe-alignment` | |
| `remark-lint-table-pipes` | |
| `remark-lint-unordered-list-marker-style` | `+` |


## Usage

You probably want to use it on the CLI through a config file:

```diff
 ...
 "remarkConfig": {
   "plugins": [
     ...
+    "@laysent/remark-preset-lint",
     ...
   ]
 }
 ...
```

Or use it on the CLI directly

```sh
remark -u @laysent/remark-preset-lint readme.md
```

Or use this on the API:

```diff
 var remark = require('remark');
 var report = require('vfile-reporter');

 remark()
+  .use(require('@laysent/remark-preset-lint'))
   .process('_Emphasis_ and **importance**', function (err, file) {
     console.error(report(err || file));
   });
```

## License

[MIT](https://github.com/laysent/remark-lint-plugins/blob/master/license) © [LaySent](https://github.com/laysent)

