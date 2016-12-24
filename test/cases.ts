import * as path from "path";

import { LesshintMutationsProvider } from "../lib/lesshintMutationsProvider";
import { TestsFactory } from "automutate/test/cases/testsFactory";

(async (): Promise<void> => {
    const testsFactory = new TestsFactory(
        (fileName: string, settingsFileName: string) => new LesshintMutationsProvider({
            args: [fileName],
            config: settingsFileName
        }),
        {
            actual: "actual.less",
            expected: "expected.less",
            original: "original.less",
            settings: ".lesshintrc"
        });

    await testsFactory.describe(path.join(__dirname, "cases"));
})();
