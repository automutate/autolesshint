import { IMutations } from "automutate/lib/mutation";
import { ITextSwapMutation } from "automutate/lib/mutators/textSwapMutator";

import { ILesshintComplaint } from "../lesshint";
import { ISuggester } from "../suggester";

/**
 * Configuration options for the string_quotes rule.
 */
export interface IStringQuotesConfig {
    style?: "double" | "single";
}

/**
 * Adds fix suggestions for the StringQuotes rule.
 */
export class StringQuotesSuggester implements ISuggester<IStringQuotesConfig> {
    /**
     * Suggests a mutation to fix a complaint, if possible.
     *
     * @param complaint   Complaint result from running Lesshint.
     * @param config   Configuration options for the rule.
     * @returns Suggested mutation for the fix.
     */
    public suggestMutation(complaint: ILesshintComplaint, config: IStringQuotesConfig): IMutations {
        const preferredQuote: string = config.style === "double" ? '"' : "'";
        const currentQuote: string = config.style === "double" ? "'" : '"';
        const endOffset: number = complaint.source.lastIndexOf(currentQuote) - complaint.source.indexOf(currentQuote);

        return {
            mutations: [
                {
                    insertion: preferredQuote,
                    range: {
                        begin: complaint.position,
                        end: complaint.position + 1
                    },
                    type: "text-swap"
                } as ITextSwapMutation,
                {
                    insertion: preferredQuote,
                    range: {
                        begin: complaint.position + endOffset,
                        end: complaint.position + endOffset + 1
                    },
                    type: "text-swap"
                } as ITextSwapMutation
            ],
            range: {
                begin: complaint.position,
                end: complaint.position + endOffset
            },
            type: "multiple"
        };
    }
}
