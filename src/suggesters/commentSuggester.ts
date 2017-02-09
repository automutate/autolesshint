import { ITextDeleteMutation } from "automutate/lib/mutators/textDeleteMutator";

import { ILesshintComplaint } from "../lesshint";
import { ISuggester } from "../suggester";

/**
 * Adds fix suggestions for the comment rule.
 */
export class CommentSuggester implements ISuggester<void> {
    /**
     * Suggests a mutation to fix a complaint, if possible.
     * 
     * @param complaint   Complaint result from running Lesshint.
     * @param config   Configuration options for the rule.
     * @param linesRaw   Source file's raw line contents.
     * @returns A Promise for a fix mutation, if possible.
     */
    public suggestMutation(complaint: ILesshintComplaint, config: void, linesRaw: string[]): ITextDeleteMutation {
        const originalInput = linesRaw.join("");

        return {
            range: {
                begin: complaint.position,
                end: originalInput.indexOf("*/", complaint.position) + "*/".length
            },
            type: "text-delete"
        };
    }
}