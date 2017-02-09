import { ITextSwapMutation } from "automutate/lib/mutators/textSwapMutator";

import { ILesshintComplaint } from "../lesshint";
import { ISuggester } from "../suggester";

/**
 * Configuration options for the border_zero rule.
 */
export interface IBorderZeroConfig {
    style: "none" | "zero";
}

/**
 * Adds fix suggestions for the border_zero rule.
 */
export class BorderZeroSuggester implements ISuggester<IBorderZeroConfig> {
    /**
     * Suggests a mutation to fix a complaint, if possible.
     * 
     * @param complaint   Complaint result from running Lesshint.
     * @returns Suggested mutation for the fix.
     */
    public suggestMutation(complaint: ILesshintComplaint, config: IBorderZeroConfig): ITextSwapMutation {
        let insertion: string;
        let length: number;

        if (config.style === "zero") {
            insertion = "0";
            length = "none".length;
        } else {
            insertion = "none";
            length = "0".length;
        }

        return {
            insertion,
            range: {
                begin: complaint.position,
                end: complaint.position + length
            },
            type: "text-swap"
        };
    }
}