import { ITextDeleteMutation } from "automutate/lib/mutators/textDeleteMutator";

import { ILesshintComplaint } from "../lesshint";
import { ISuggester } from "../suggester";

/**
 * Adds fix suggestions for the trailingWhitespace rule.
 */
export class TrailingWhitespaceSuggester implements ISuggester<void> {
    /**
     * Suggests a mutation to fix a complaint, if possible.
     *
     * @param complaint   Complaint result from running Lesshint.
     * @returns Suggested mutation for the fix.
     */
    public suggestMutation(complaint: ILesshintComplaint): ITextDeleteMutation {
        const whitespaceParts = complaint.source.split(/\S/);

        return {
            range: {
                begin: complaint.position - whitespaceParts[whitespaceParts.length - 1].length + 1,
                end: complaint.position + 1
            },
            type: "text-delete"
        };
    }
}
