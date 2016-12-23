import { AutoMutator } from "automutate/lib/automutator";
import { ConsoleLogger } from "automutate/lib/loggers/consoleLogger";
import { FileMutationsApplier } from "automutate/lib/mutationsAppliers/fileMutationsApplier";

import { LesshintMutationsProvider } from "./lesshintMutationsProvider";

/**
 * Settings to run Autolesshint.
 */
export interface IAutoLesshintSettings {
    /**
     * One or more files/directories to recursively scan.
     */
    args: string[];

    /**
     * Configuration file to use.
     */
    config?: string;

    /**
     * 	A minimatch glob pattern or a file to exclude from being linted.
     */
    exclude?: string[];
}

/**
 * Runs autolesshint.
 */
export class Runner {
    /**
     * Runs waves of file mutations.
     */
    private autoMutator: AutoMutator;

    /**
     * Initializes a new instance of the Runner class.
     * 
     * @param settings   Settings to run autolesshint.
     */
    public constructor(settings: IAutoLesshintSettings) {
        const logger = new ConsoleLogger();

        this.autoMutator = new AutoMutator(
            new FileMutationsApplier(logger),
            new LesshintMutationsProvider(settings),
            logger);
    }

    /**
     * @returns A Promise for running autolesshint.
     */
    public async run(): Promise<void> {
        return this.autoMutator
            .run()
            .catch(error => console.error("Error in autolesshint:", error));
    }
}