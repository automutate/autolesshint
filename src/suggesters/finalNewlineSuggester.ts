import { ITextInsertMutation } from "automutate/lib/mutators/textInsertMutator";

import { ILesshintComplaint } from "../lesshint";
import { ISuggester } from "../suggester";

/**
 * Adds fix suggestions for the finalNewline rule.
 */
export class FinalNewlineSuggester implements ISuggester<void> {
    /**
     * Suggests a mutation to fix a complaint, if possible.
     * 
     * @param complaint   Complaint result from running Lesshint.
     * @param config   Configuration options for the rule.
     * @param linesRaw   Source file's raw line contents.
     * @returns Suggested mutation for the fix.
     */
    public suggestMutation(complaint: ILesshintComplaint, config: void, linesRaw: string[]): ITextInsertMutation {
        return {
            insertion: "\n",
            range: {
                begin: complaint.position
            },
            type: "text-insert"
        };
    }
}