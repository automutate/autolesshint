# autolesshint
[![npm](https://img.shields.io/npm/v/autolesshint.svg)](https://www.npmjs.com/package/autolesshint)

`autolesshint` is a tool to automatically fix [Lesshint](https://github.com/lesshint/lesshint) complaints.

* [Requirements](#requirements)
* [Installation](#installation)
* [CLI usage](#cli-usage)
* [Custom rules](#custom-rules)

## Requirements
[Node.js](https://nodejs.org/) 0.12 (or later) or [io.js](https://iojs.org/) 1.0 (or later).

## Installation
Run the following command from the command line (add `-g` to install globally):

```
npm install lesshint
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
