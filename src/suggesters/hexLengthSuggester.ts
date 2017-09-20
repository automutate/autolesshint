import { ITextSwapMutation } from "automutate/lib/mutators/textSwapMutator";

import { ILesshintComplaint } from "../lesshint";
import { ISuggester } from "../suggester";

/**
 * Configuration options for the hex_length rule.
 */
export interface IHexLengthConfig {
    style?: "long" | "short";
}

/**
 * Adds fix suggestions for the hex_length rule.
 */
export class HexLengthSuggester implements ISuggester<IHexLengthConfig> {
    /**
     * Suggests a mutation to fix a complaint.
     *
     * @param complaint   Complaint result from running Lesshint.
     * @param config   Configuration options for the rule.
     * @returns Suggested mutation for the fix.
     */
    public suggestMutation(complaint: ILesshintComplaint, config: IHexLengthConfig): ITextSwapMutation {
        return config.style === "short"
            ? this.suggestShortMutation(complaint)
            : this.suggestLongMutation(complaint);
    }

    /**
     * Suggests a mutation to fix a complaint that a hex should be short.
     *
     * @param complaint   Complaint result from running Lesshint.
     * @param fileInfo   Contents of the source file in various forms.
     * @returns Suggested mutation for the fix.
     */
    private suggestShortMutation(complaint: ILesshintComplaint): ITextSwapMutation {
        return {
            insertion: [
                "#",
                complaint.source[complaint.column],
                complaint.source[complaint.column + 2],
                complaint.source[complaint.column + 4]
            ].join(""),
            range: {
                begin: complaint.position,
                end: complaint.position + 7
            },
            type: "text-swap"
        };
    }

    /**
     * Suggests a mutation to fix a complaint that a hex should be long.
     *
     * @param complaint   Complaint result from running Lesshint.
     * @param fileInfo   Contents of the source file in various forms.
     * @returns Suggested mutation for the fix.
     */
    private suggestLongMutation(complaint: ILesshintComplaint): ITextSwapMutation {
        return {
            insertion: [
                "#",
                complaint.source[complaint.column],
                complaint.source[complaint.column],
                complaint.source[complaint.column + 1],
                complaint.source[complaint.column + 1],
                complaint.source[complaint.column + 2],
                complaint.source[complaint.column + 2]
            ].join(""),
            range: {
                begin: complaint.position,
                end: complaint.position + 4
            },
            type: "text-swap"
        };
    }
}
