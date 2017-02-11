import { IMutation } from "automutate/lib/mutation";

import { ILesshintComplaint } from "./lesshint";

/**
 * Contents of a file in various forms.
 */
export interface IFileInfo {
    /**
     * The file's raw line contents.
     */
    linesRaw: string[];

    /**
     * The file's original text.
     */
    text: string;
}

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
     * @param fileInfo   Contents of the source file in various forms.
     * @returns Suggested mutation(s) for the fix, if possible.
     */
    suggestMutation(complaint: ILesshintComplaint, config: TConfig, fileInfo: IFileInfo): IMutation | undefined;
}
