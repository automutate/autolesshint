import { AutoMutator } from "automutate/lib/autoMutator";
import * as fs from "fs";

import { fileContentsGetter } from "./fileContentsGetter";
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
     * Path to a lesshint configuration file.
     */
    config?: string;

    /**
     * 	A minimatch glob pattern or a file to exclude from being linted.
     */
    exclude?: string[];
}

/**
 * Parses config settings from a local file, if available.
 * 
 * @param configFilePath   Path to a settings file, if available.
 * @returns A Promise for configuration settings.
 */
const getConfigSettings = async (configFilePath?: string) => {
    if (configFilePath === undefined) {
        return {};
    }

    return await new Promise<ILesshintConfig>((resolve, reject) => {
        fs.readFile(configFilePath, (error: Error | undefined, contents: string | Buffer): void => {
            error
                ? resolve({})
                : resolve(JSON.parse(contents.toString()));
        });
    });
};

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
        const configs: ILesshintConfig = await getConfigSettings(this.settings.config);

        try {
            await this.runWithConfigs(configs);
        } catch (error) {
            console.error("Error in autolesshint:", error);
        }
    }

    /**
     * @param configs Lesshint configuration settings.
     * @returns A Promise for running autolesshint.
     */
    private async runWithConfigs(configs: ILesshintConfig): Promise<void> {
        const waveReporter: LesshintWaveReporter = new LesshintWaveReporter(configs, fileContentsGetter);

        const autoMutator: AutoMutator = new AutoMutator({
            mutationsProvider: new LesshintMutationsProvider({
                reporter: waveReporter,
                ...this.settings
            })
        });

        await autoMutator.run();
    }
}
