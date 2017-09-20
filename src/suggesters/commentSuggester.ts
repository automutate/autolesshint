import { ITextDeleteMutation } from "automutate/lib/mutators/textDeleteMutator";

import { ILesshintComplaint } from "../lesshint";
import { IFileInfo, ISuggester } from "../suggester";

/**
 * Adds fix suggestions for the comment rule.
 */
export class CommentSuggester implements ISuggester<void> {
    /**
     * Suggests a mutation to fix a complaint, if possible.
     *
     * @param complaint   Complaint result from running Lesshint.
     * @param config   Configuration options for the rule.
     * @param fileInfo   Contents of the source file in various forms.
     * @returns Suggested mutation for the fix.
     */
    public suggestMutation(complaint: ILesshintComplaint, config: void, fileInfo: IFileInfo): ITextDeleteMutation {
        const originalInput = fileInfo.linesRaw.join("");

        return {
            range: {
                begin: complaint.position,
                end: originalInput.indexOf("*/", complaint.position) + "*/".length
            },
            type: "text-delete"
        };
    }
}
