import { ITextInsertMutation } from "automutate/lib/mutators/textInsertMutator";

import { ILesshintComplaint } from "../lesshint";
import { ISuggester } from "../suggester";

/**
 * Adds fix suggestions for the trailingSemicolon rule.
 */
export class TrailingSemicolonSuggester implements ISuggester<void> {
    /**
     * Suggests a mutation to fix a complaint, if possible.
     *
     * @param complaint   Complaint result from running Lesshint.
     * @returns Suggested mutation for the fix.
     */
    public suggestMutation(complaint: ILesshintComplaint): ITextInsertMutation {
        return {
            insertion: ";",
            range: {
                begin: complaint.position
            },
            type: "text-insert"
        };
    }
}
