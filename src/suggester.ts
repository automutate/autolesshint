import { IMutation } from "automutate/lib/mutation";

import { ILesshintComplaint } from "./lesshintWaveReporter";

/**
 * Adds fix suggestions to Lesshint complaints.
 */
export interface ISuggester {
    /**
     * Suggests a mutation to fix a complaint, if possible.
     * 
     * @param complaint   Complaint result from running Lesshint.
     * @returns A fix mutation, if possible.
     */
    suggestMutation(complaint: ILesshintComplaint): IMutation | undefined;
}
