import { AutoMutator } from "automutate/lib/automutator";
import { ConsoleLogger } from "automutate/lib/loggers/consoleLogger";
import { FileMutationsApplier } from "automutate/lib/mutationsAppliers/fileMutationsApplier";

import { LesshintMutationsProvider } from "./lesshintMutationsProvider";

/**
 * Settings to run Lesshint.
 */
export interface IAutoLesshintSettings {
    /**
     * 	A minimatch glob pattern or a file to exclude from being linted.
     */
    exclude?: string[];

    /**
     * One or more files/directories to recursively scan.
     */
    args: string[];
}

(async (settings: IAutoLesshintSettings): Promise<void> => {
    const logger = new ConsoleLogger();
    const autoMutator: AutoMutator = new AutoMutator(
        new FileMutationsApplier(logger),
        new LesshintMutationsProvider(settings),
        logger);

    await autoMutator
        .run()
        .catch(error => console.error("Error in autolesshint:", error));
})({
    args: ["test/before.less"]
});
