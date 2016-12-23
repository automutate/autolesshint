import * as path from "path";

import { LesshintMutationsProvider } from "../lib/lesshintMutationsProvider";
import { TestsFactory } from "automutate/test/cases/testsFactory";

(async (): Promise<void> => {
    const testsFactory = new TestsFactory(
        (fileName: string) => new LesshintMutationsProvider({
            args: [fileName]
        }),
        ".less");

    await testsFactory.create(path.join(__dirname, "cases"));
})();
