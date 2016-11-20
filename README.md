# autolesshint
Rough draft of a tool to automatically fixes Lesshint complaints.

*Note: pending `lesshint` updates this won't work yet if cloned locally*

Stitches together [`lesshint`](https://github.com/lesshint/lesshint) and [`automutate`](https://github.com/autolint/automutate) to automatically fix `lesshint` rule complaints when possible.

`automutate` runs waves of `lesshint` and uses a [custom `lesshint` reporter](https://github.com/autolint/autolesshint/blob/master/src/lesshintWaveReporter.ts) to capture rule complaints.
