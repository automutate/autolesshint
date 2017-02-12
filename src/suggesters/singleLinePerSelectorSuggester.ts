import { ITextInsertMutation } from "automutate/lib/mutators/textInsertMutator";

import { ILesshintComplaint } from "../lesshint";
import { IFileInfo, ISuggester } from "../suggester";
import { getLinebreakStyle } from "../utils";

/**
 * Adds fix suggestions for the single_line_per_selector rule.
 */
export class SingleLinePerSelectorSuggester implements ISuggester<void> {
    /**
     * Suggests a mutation to fix a complaint, if possible.
     * 
     * @param complaint   Complaint result from running Lesshint.
     * @param config   Configuration options for the rule.
     * @param fileInfo   Contents of the source file in various forms.
     * @returns Suggested mutation for the fix.
     */
    public suggestMutation(complaint: ILesshintComplaint, config: void, fileInfo: IFileInfo): ITextInsertMutation | undefined {
        // The first property in a line shouldn't have a newline added
        if (!/\S/.test(fileInfo.linesRaw[complaint.line - 1].substring(0, complaint.column - 1))) {
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