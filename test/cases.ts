import { TestsFactory } from "automutate-tests/lib/testsFactory";
import * as fs from "fs";

import { LesshintMutationsProvider } from "../lib/lesshintMutationsProvider";
import { LesshintWaveReporter } from "../lib/lesshintWaveReporter";
import { fileContentsGetter } from "../lib/fileContentsGetter";

const testsFactory = new TestsFactory(
    (fileName: string, settingsFileName: string) => {
        const configs = JSON.parse(fs.readFileSync(settingsFileName).toString());

        return new LesshintMutationsProvider({
            args: [fileName],
            config: settingsFileName,
            reporter: new LesshintWaveReporter(configs, fileContentsGetter)
        });
    },
    {
        actual: "actual.less",
        expected: "expected.less",
        original: "original.less",
        settings: ".lesshintrc"
    });

testsFactory.describe(__dirname);
