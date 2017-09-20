import { ITextDeleteMutation } from "automutate/lib/mutators/textDeleteMutator";

import { ILesshintComplaint } from "../lesshint";
import { ISuggester } from "../suggester";

/**
 * Configuration options for the zero_unit rule.
 */
export interface IZeroUnitConfig {
    style: "keep_unit" | "no_unit";
}

/**
 * Adds fix suggestions for the zero_unit rule.
 */
export class ZeroUnitSuggester implements ISuggester<IZeroUnitConfig> {
    /**
     * Suggests a mutation to fix a complaint, if possible.
     *
     * @param complaint   Complaint result from running Lesshint.
     * @returns Suggested mutation for the fix.
     */
    public suggestMutation(complaint: ILesshintComplaint, config: IZeroUnitConfig): ITextDeleteMutation | undefined {
        if (config.style === "keep_unit") {
            return undefined;
        }

        return {
            range: {
                begin: complaint.position + 1,
                end: complaint.position + complaint.source.indexOf(";", complaint.column) - complaint.column + 1
            },
            type: "text-delete"
        };
    }
}
