import { AutoMutator } from "automutate/lib/automutator";
import { ConsoleLogger } from "automutate/lib/loggers/consoleLogger";
import { FileMutationsApplier } from "automutate/lib/mutationsAppliers/fileMutationsApplier";
import * as fs from "fs";

import { ILesshintConfig } from "./lesshint";
import { LesshintMutationsProvider } from "./lesshintMutationsProvider";
import { LesshintWaveReporter } from "./lesshintWaveReporter";

/**
 * Settings to run Autolesshint.
 */
export interface IAutoLesshintSettings {
    /**
     * One or more files/directories to recursively scan.
     */
    args: string[];

    /**
     * Lesshint configuration options, keyed by rule name.
     */
    config: string;

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
    private readonly settings: IAutoLesshintSettings;

    /**
     * Initializes a new instance of the Runner class.
     * 
     * @param settings   Settings to run Autolesshint.
     */
    public constructor(settings: IAutoLesshintSettings) {
        this.settings = settings;
    }

    /**
     * @returns A Promise for running autolesshint.
     */
    public async run(): Promise<void> {
        const logger: ConsoleLogger = new ConsoleLogger();
        const configs: ILesshintConfig = await new Promise<ILesshintConfig>((resolve, reject) => {
            fs.readFile(this.settings.config, (error: Error | undefined, contents: string | Buffer): void => {
                error ? reject(error) : resolve(JSON.parse(contents.toString()));
            });
        });
        const waveReporter: LesshintWaveReporter = new LesshintWaveReporter(configs);

        const autoMutator: AutoMutator = new AutoMutator(
            new FileMutationsApplier(logger),
            new LesshintMutationsProvider({
                reporter: waveReporter,
                ...this.settings
            }),
            logger);

        return autoMutator
            .run()
            .catch(error => console.error("Error in autolesshint:", error));
    }
}
