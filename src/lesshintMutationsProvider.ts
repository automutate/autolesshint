const lesshint = require("lesshint/lib/cli");

import { IFileMutations, IMutationsProvider, IMutationsWave } from "automutate/lib/mutationsProvider";

import { ILesshintComplaint } from "./lesshint";
import { LesshintWaveReporter } from "./lesshintWaveReporter";
import { IAutoLesshintSettings } from "./runner";

/**
 * Settings to run mutations for Lesshint.
 */
export interface IMutationsProviderSettings extends IAutoLesshintSettings {
    /**
     * Lesshint reporter that keeps waves of complaints.
     */
    reporter: LesshintWaveReporter;
}

/**
 * Provides waves of lesshint failure fixes as file mutations.
 */
export class LesshintMutationsProvider implements IMutationsProvider {
    /**
     * Settings to run Lesshint.
     */
    private readonly settings: IMutationsProviderSettings;

    /**
     * Initializes a new instance of the LesshintMutationsProvider class.
     *
     * @param settings   Settings to run Lesshint.
     */
    public constructor(settings: IMutationsProviderSettings) {
        this.settings = {
            reporter: settings.reporter,
            ...settings
        };
    }

    /**
     * Creates a wave of file mutations.
     *
     * @returns A Promise for a wave of file mutations.
     */
    public async provide(): Promise<IMutationsWave> {
        // Lesshint throws on any errors or warnings, so it must be caught here
        await lesshint(this.settings).catch((): void => {});

        const complaints = (await this.settings.reporter.pump())
            .filter((complaint: ILesshintComplaint): boolean => !!complaint.suggestedFix);

        return {
            fileMutations: this.groupMutationsByFiles(complaints)
        };
    }

    /**
     * Groups lesshint complaints into file mutations.
     *
     * @param complaints   Complaints from lesshint.
     * @returns File-grouped complaints, if any.
     */
    public groupMutationsByFiles(complaints: ILesshintComplaint[]): IFileMutations | undefined {
        if (!complaints.length) {
            return undefined;
        }

        const fileMutations: IFileMutations = {};

        for (const complaint of complaints) {
            if (!fileMutations[complaint.fullPath]) {
                fileMutations[complaint.fullPath] = [];
            }

            fileMutations[complaint.fullPath].push(complaint.suggestedFix!);
        }

        return fileMutations;
    }
}
