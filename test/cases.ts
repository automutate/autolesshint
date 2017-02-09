import { LesshintMutationsProvider } from "../lib/lesshintMutationsProvider";
import { TestsFactory } from "automutate-tests/lib/testsFactory";

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

testsFactory.describe(__dirname);
