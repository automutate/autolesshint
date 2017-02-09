import { IMutations } from "automutate/lib/mutation";
import { ITextInsertMutation } from "automutate/lib/mutators/textInsertMutator";

import { ILesshintComplaint } from "../lesshint";
import { ISuggester } from "../suggester";

/**
 * Adds fix suggestions for the attribute_quotes rule.
 */
export class AttributeQuotesSuggester implements ISuggester<void> {
    /**
     * Suggests a mutation to fix a complaint, if possible.
     * 
     * @param complaint   Complaint result from running Lesshint.
     * @returns A Promise for a fix mutation, if possible.
     */
    public suggestMutation(complaint: ILesshintComplaint): IMutations {
        const end = complaint.position + (complaint.source.indexOf("]") - complaint.source.indexOf("="));

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