import { IMutation } from "automutate/lib/mutation";

import { ILesshintComplaint } from "./lesshint";

/**
 * Adds fix suggestions to Lesshint complaints.
 * 
 * @type TConfig   Configuration options for the rule.
 */
export interface ISuggester<TConfig> {
    /**
     * Suggests a mutation to fix a complaint, if possible.
     * 
     * @param complaint   Complaint result from running Lesshint.
     * @param config   Configuration options for the rule.
     * @param linesRaw   Source file's raw line contents.
     * @returns Suggested mutation(s) for the fix, if possible.
     */
    suggestMutation(complaint: ILesshintComplaint, config: TConfig, linesRaw: string[]): IMutation | undefined;
}
