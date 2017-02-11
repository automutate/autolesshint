import { ITextInsertMutation } from "automutate/lib/mutators/textInsertMutator";

import { ILesshintComplaint } from "../lesshint";
import { IFileInfo, ISuggester } from "../suggester";

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
    public suggestMutation(complaint: ILesshintComplaint, config: void, fileInfo: IFileInfo): ITextInsertMutation {
        let useWindowsEndlines;

        if (fileInfo.linesRaw.length > 1 && fileInfo.linesRaw[0][fileInfo.linesRaw[0].length - 1] === "\n") {
            useWindowsEndlines = fileInfo.linesRaw[0].substring(fileInfo.linesRaw[0].length - 2) === "\r\n";
        } else {
            useWindowsEndlines = process.platform.indexOf("win") === 0;
        }

        return {
            insertion: useWindowsEndlines ? "\r\n" : "\n",
            range: {
                begin: complaint.position
            },
            type: "text-insert"
        };
    }
}