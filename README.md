# autolesshint
[![npm](https://img.shields.io/npm/v/autolesshint.svg)](https://www.npmjs.com/package/autolesshint)

`autolesshint` is a tool to automatically fix [Lesshint](https://github.com/lesshint/lesshint) >=v3.0.1 complaints.

* [Installation](#installation)
* [CLI usage](#cli-usage)
* [Supported rules](#supported-rules)
* [Contributing](#contributing)

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
* `empty_rule`
* `final_newline`
* `hex_length`
* `newline_after_block`
* `space_before_brace`
* `space_between_parens`
* `string_quotes`
* `trailing_semicolon`
* `trailing_whitespace`
* `url_quotes`
* `zero_unit`

See the [Complete rule coverage](https://github.com/automutate/autolesshint/milestone/1) milestone for upcoming coverage support.

## Unsupported rules

These rules contain logic that require user input and can't be automatically fixed:

* `depth_level`
* `duplicate_property`
* `id_selector`
* `import_path`
* `important_rule`
* `max_char_per_line`
* `property_units`
* `qualifying_element`
* `selector_naming`
* `url_format`

## Contributing

`autolesshint` uses [Gulp](http://gulpjs.com/) to automate building, which requires [Node.js](http://node.js.org).

To build from scratch, install NodeJS and run the following commands:

```
npm install -g gulp
npm install
gulp
```

[automutate](https://github.com/automutate/automutate) manages the runtime of taking in lint complaints from `lesshint`.
These are mapped to `Suggester` classes in `src/suggesters` by name.

[automutate-tests](https://github.com/automutate/automutate-tests) manages development-time tests verifying actual file mutations.

### Adding a suggester

* Add a `Suggester` class with a linter's name. `my_rule` would be mapped to `src/suggesters/myRuleSuggester.ts` that would have to export a `MyRuleSuggester` class that implements the `ISuggester` interface.
* Add test case(s) under `test/cases` that each have an `original.less`, `expected.less`, `actual.less`, and `.lesshintrc`.
* Add the suggester to the list in `README.md`.
* Submit a PR referencing the issue corresponding to the lint rule.
