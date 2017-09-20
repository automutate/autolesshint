import { ITextSwapMutation } from "automutate/lib/mutators/textSwapMutator";

import { ILesshintComplaint } from "../lesshint";
import { IFileInfo, ISuggester } from "../suggester";

/**
 * Configuration options for the hex_notation rule.
 */
export interface IHexNotationConfig {
    style?: "lowercase" | "uppercase";
}

/**
 * Adds fix suggestions for the hex_notation rule.
 */
export class HexNotationSuggester implements ISuggester<IHexNotationConfig> {
    /**
     * Suggests a mutation to fix a complaint.
     *
     * @param complaint   Complaint result from running Lesshint.
     * @returns Suggested mutation for the fix.
     */
    public suggestMutation(complaint: ILesshintComplaint, config: IHexNotationConfig, fileInfo: IFileInfo): ITextSwapMutation {
        const original: string = fileInfo.text.substring(
            complaint.position,
            fileInfo.text.substring(complaint.position + 2).search(/\W/i) + complaint.position + 2);

        return {
            insertion: config.style === "uppercase"
                ? original.toUpperCase()
                : original.toLowerCase(),
            range: {
                begin: complaint.position,
                end: complaint.position + original.length
            },
            type: "text-swap"
        };
    }
}
