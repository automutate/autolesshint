import { ITextInsertMutation } from "automutate/lib/mutators/textInsertMutator";

import { ILesshintComplaint } from "../lesshint";
import { IFileInfo, ISuggester } from "../suggester";
import { getLinebreakStyle } from "../utils";

/**
 * Adds fix suggestions for the finalNewline rule.
 */
export class FinalNewlineSuggester implements ISuggester<void> {
    /**
     * Suggests a mutation to fix a complaint, if possible.
     *
     * @param complaint   Complaint result from running Lesshint.
     * @param config   Configuration options for the rule.
     * @param fileInfo   Contents of the source file in various forms.
     * @returns Suggested mutation for the fix.
     */
    public suggestMutation(complaint: ILesshintComplaint, config: void, fileInfo: IFileInfo): ITextInsertMutation | undefined {
        const { text } = fileInfo;

        // Fixes for https://github.com/lesshint/lesshint/issues/431
        if (text[text.length - 1] === "\n") {
            return undefined;
        }

        return {
            insertion: getLinebreakStyle(fileInfo.linesRaw),
            range: {
                begin: complaint.position
            },
            type: "text-insert"
        };
    }
}
