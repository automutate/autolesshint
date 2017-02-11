import { ITextInsertMutation } from "automutate/lib/mutators/textInsertMutator";

import { ILesshintComplaint } from "../lesshint";
import { IFileInfo, ISuggester } from "../suggester";
import { getLinebreakStyle } from "../utils";

/**
 * Adds fix suggestions for the newline_after_block rule.
 */
export class NewlineAfterBlockSuggester implements ISuggester<void> {
    /**
     * Suggests a mutation to fix a complaint, if possible.
     * 
     * @param complaint   Complaint result from running Lesshint.
     * @param config   Configuration options for the rule.
     * @param fileInfo   Contents of the source file in various forms.
     * @returns Suggested mutation for the fix.
     */
    public suggestMutation(complaint: ILesshintComplaint, config: void, fileInfo: IFileInfo): ITextInsertMutation {
        return {
            insertion: getLinebreakStyle(fileInfo.linesRaw),
            range: {
                begin: complaint.position
            },
            type: "text-insert"
        };
    }
}