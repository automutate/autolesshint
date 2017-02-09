import { IMultipleMutations } from "automutate/lib/mutators/multipleMutator";
import { ITextInsertMutation } from "automutate/lib/mutators/textInsertMutator";

import { ILesshintComplaint } from "../lesshint";
import { ISuggester } from "../suggester";

/**
 * Adds fix suggestions for the urlQuotes rule.
 */
export class UrlQuotesSuggester implements ISuggester<void> {
    /**
     * Suggests a mutation to fix a complaint, if possible.
     * 
     * @param complaint   Complaint result from running Lesshint.
     * @returns Suggested mutation for the fix.
     */
    public suggestMutation(complaint: ILesshintComplaint): IMultipleMutations {
        const end = complaint.position + complaint.source.indexOf(")", complaint.column) - complaint.column + 2;

        return {
            mutations: [
                {
                    insertion: "'",
                    range: {
                        begin: complaint.position
                    },
                    type: "text-insert"
                } as ITextInsertMutation,
                {
                    insertion: "'",
                    range: {
                        begin: end
                    },
                    type: "text-insert"
                } as ITextInsertMutation
            ],
            range: {
                begin: complaint.position,
                end: end
            },
            type: "multiple"
        };
    }
}