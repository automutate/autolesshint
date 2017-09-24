import { ITextDeleteMutation } from "automutate/lib/mutators/textDeleteMutator";

import { ITextSwapMutation } from "automutate/lib/mutators/textSwapMutator";
import { ILesshintComplaint } from "../lesshint";
import { IFileInfo, ISuggester } from "../suggester";

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
     * @param config   Configuration options for the rule.
     * @param fileInfo   Contents of the source file in various forms.
     * @returns Suggested mutation for the fix.
     */
    public suggestMutation(complaint: ILesshintComplaint, config: IZeroUnitConfig, fileInfo: IFileInfo): ITextDeleteMutation | ITextSwapMutation {
        return (config.style === "keep_unit" || complaint.message.indexOf(keepUnitMessage) !== -1)
            ? this.suggestKeepUnitMutation(complaint, fileInfo.text)
            : this.suggestNoUnitMutation(complaint);
    }

    /**
     * Suggests a mutation to fix a complaint that units should be kept.
     *
     * @param complaint   Complaint result from running Lesshint.
     * @param text   The file's original text.
     * @returns Suggested mutation for the fix.
     */
    private suggestKeepUnitMutation(complaint: ILesshintComplaint, text: string): ITextSwapMutation {
        const { source } = complaint;
        const insertion = source.replace(/0([\s;\r\n}])/g, "0px$1");
        const begin = text.lastIndexOf(source, complaint.position);

        return {
            insertion,
            range: {
                begin,
                end: begin + source.length
            },
            type: "text-swap"
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
