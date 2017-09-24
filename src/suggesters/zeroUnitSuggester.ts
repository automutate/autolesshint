import { ITextDeleteMutation } from "automutate/lib/mutators/textDeleteMutator";

import { ITextInsertMutation } from "automutate/lib/mutators/textInsertMutator";
import { ILesshintComplaint } from "../lesshint";
import { ISuggester } from "../suggester";

/**
 * Configuration options for the zero_unit rule.
 */
export interface IZeroUnitConfig {
    style: "keep_unit" | "no_unit";
}

const keepUnitMessage = "should not be omitted";

/**
 * Adds fix suggestions for the zero_unit rule.
 */
export class ZeroUnitSuggester implements ISuggester<IZeroUnitConfig> {
    /**
     * Suggests a mutation to fix a complaint.
     *
     * @param complaint   Complaint result from running Lesshint.
     * @returns Suggested mutation for the fix.
     */
    public suggestMutation(complaint: ILesshintComplaint, config: IZeroUnitConfig): ITextDeleteMutation | ITextInsertMutation {
        return (config.style === "keep_unit" || complaint.message.indexOf(keepUnitMessage) !== -1)
            ? this.suggestKeepUnitMutation(complaint)
            : this.suggestNoUnitMutation(complaint);
    }

    /**
     * Suggests a mutation to fix a complaint that units should be kept.
     *
     * @param complaint   Complaint result from running Lesshint.
     * @returns Suggested mutation for the fix.
     */
    private suggestKeepUnitMutation(complaint: ILesshintComplaint): ITextInsertMutation {
        return {
            insertion: "px",
            range: {
                begin: complaint.position + 1
            },
            type: "text-insert"
        };
    }

    /**
     * Suggests a mutation to fix a complaint that units should not be kept.
     *
     * @param complaint   Complaint result from running Lesshint.
     * @returns Suggested mutation for the fix.
     */
    private suggestNoUnitMutation(complaint: ILesshintComplaint): ITextDeleteMutation {
        return {
            range: {
                begin: complaint.position + 1,
                end: complaint.position + complaint.source.indexOf(";", complaint.column) - complaint.column + 1
            },
            type: "text-delete"
        };
    }
}
