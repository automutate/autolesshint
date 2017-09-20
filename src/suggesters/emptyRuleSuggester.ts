import { ITextDeleteMutation } from "automutate/lib/mutators/textDeleteMutator";

import { ILesshintComplaint } from "../lesshint";
import { IFileInfo, ISuggester } from "../suggester";

/**
 * Adds fix suggestions for the empty_rule rule.
 */
export class EmptyRuleSuggester implements ISuggester<void> {
    /**
     * Suggests a mutation to fix a complaint, if possible.
     *
     * @param complaint   Complaint result from running Lesshint.
     * @param fileInfo   Contents of the source file in various forms.
     * @returns Suggested mutation for the fix.
     */
    public suggestMutation(complaint: ILesshintComplaint, config: void, fileInfo: IFileInfo): ITextDeleteMutation {
        return {
            range: {
                begin: complaint.position,
                end: fileInfo.text.indexOf("}", complaint.position) + 1
            },
            type: "text-delete"
        };
    }
}
