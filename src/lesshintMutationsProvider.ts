const lesshint: any = require("lesshint/lib/cli");

import { IFileMutations, IMutationsProvider, IMutationsWave } from "automutate/lib/mutationsProvider";

import { IAutoLesshintSettings } from "./index";
import { LesshintWaveReporter } from "./lesshintWaveReporter";

/**
 * Provides waves of lesshint failure fixes as file mutations.
 */
export class LesshintMutationsProvider implements IMutationsProvider {
    /**
     * Lesshint reporter that keeps waves of complaints.
     */
    private readonly waveReporter: LesshintWaveReporter = new LesshintWaveReporter();

    /**
     * Settings to run Lesshint.
     */
    private readonly settings: IAutoLesshintSettings;

    /**
     * Initializes a new instance of the LesshintMutationsProvider class.
     * 
     * @param settings   Settings to run LesshintWaveReporter.
     */
    public constructor(settings: IAutoLesshintSettings) {
        this.settings = Object.assign(
            {
                onExit: () => {},
                reporter: this.waveReporter
            },
            settings);
    }

    /**
     * @returns A Promise for a wave of file mutations.
     */
    public async provide(): Promise<IMutationsWave> {
        await lesshint(this.settings).catch((error: any) => error);

        return {
            fileMutations: this.groupMutationsByFiles(
                this.waveReporter.pump()
                    .filter((complaint: any): boolean => !!complaint.suggestedFix))
        };
    }

    /**
     * Groups lesshint complaints into file mutations.
     * 
     * @param complaints   Complaints from lesshint.
     * @returns File-grouped complaints, if any.
     */
    public groupMutationsByFiles(complaints: any[]): IFileMutations | undefined {
        if (!complaints.length) {
            return undefined;
        }

        const fileMutations: IFileMutations = {};

        for (const complaint of complaints) {
            if (!fileMutations[complaint.fullPath]) {
                fileMutations[complaint.fullPath] = [];
            }

            fileMutations[complaint.fullPath].push(...complaint.suggestedFix);
        }

        return fileMutations;
    }
}
