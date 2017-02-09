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
     * @returns A fix mutation, if possible.
     */
    suggestMutation(complaint: ILesshintComplaint, config: TConfig): IMutation | undefined;
}
