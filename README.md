# autolesshint
[![npm](https://img.shields.io/npm/v/autolesshint.svg)](https://www.npmjs.com/package/autolesshint)

`autolesshint` is a tool to automatically fix [Lesshint](https://github.com/lesshint/lesshint) complaints.

* [Installation](#installation)
* [CLI usage](#cli-usage)
* [Supported rules](#supported-rules)

## Installation

Run the following command from the command line (add `-g` to install globally):

```
npm install autolesshint
```

## CLI usage

Run `autolesshint` from the command-line by passing one or more files/directories to recursively scan.

```
autolesshint src/less/ lib/style.less
```

Available Flags       | Description
----------------------|----------------------------------------------
`-c`/`--config`       | Specify the configuration file to use (will be merged with defaults).
`-e`/`--exclude`      | A [minimatch glob pattern](https://github.com/isaacs/minimatch) or a file to exclude from being linted.
`-V`/`--version`      | Show version.

## Supported rules

* `attribute_quotes`
* `border_zero`
* `comment`
* `final_newline`
* `trailing_semicolon`
* `trailing_whitespace`
* `url_quotes`

See the [Complete rule coverage](https://github.com/automutate/autolesshint/milestone/1) milestone for upcoming coverage support.
