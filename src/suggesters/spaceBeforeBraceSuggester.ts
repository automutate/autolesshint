import { ITextSwapMutation } from "automutate/lib/mutators/textSwapMutator";

import { ILesshintComplaint } from "../lesshint";
import { IFileInfo, ISuggester } from "../suggester";
import { getLinebreakStyle } from "../utils";

/**
 * Configuration options for the space_before_brace rule.
 */
export interface ISpaceBeforeBraceConfig {
    style: "new_line" | "no_space" | "one_space";
}

/**
 * Adds fix suggestions for the space_before_brace rule.
 */
export class SpaceBeforeBraceSuggester implements ISuggester<ISpaceBeforeBraceConfig> {
    /**
     * Suggests a mutation to fix a complaint, if possible.
     *
     * @param complaint   Complaint result from running Lesshint.
     * @param config   Configuration options for the rule.
     * @param fileInfo   Contents of the source file in various forms.
     * @returns Suggested mutation for the fix.
     */
    public suggestMutation(complaint: ILesshintComplaint, config: ISpaceBeforeBraceConfig, fileInfo: IFileInfo): ITextSwapMutation {
        let insertion: string;

        switch (config.style) {
            case "new_line":
                insertion = getLinebreakStyle(fileInfo.linesRaw);
                break;

            case "no_space":
                insertion = "";
                break;

            default:
                insertion = " ";
        }

        return {
            insertion,
            range: {
                begin: complaint.position,
                end: fileInfo.text.indexOf("{", complaint.position)
            },
            type: "text-swap"
        };
    }
}
