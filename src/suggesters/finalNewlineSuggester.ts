import { ITextInsertMutation } from "automutate/lib/mutators/textInsertMutator";

import { ILesshintComplaint } from "../lesshint";
import { ISuggester } from "../suggester";

/**
 * Adds fix suggestions for the finalNewline rule.
 */
export class FinalNewlineSuggester implements ISuggester<void> {
    /**
     * Suggests a mutation to fix a complaint, if possible.
     * 
     * @param complaint   Complaint result from running Lesshint.
     * @param config   Configuration options for the rule.
     * @param linesRaw   Source file's raw line contents.
     * @returns Suggested mutation for the fix.
     */
    public suggestMutation(complaint: ILesshintComplaint, config: void, linesRaw: string[]): ITextInsertMutation {
        let useWindowsEndlines;

        if (linesRaw.length > 1 && linesRaw[0][linesRaw[0].length - 1] === "\n") {
            useWindowsEndlines = linesRaw[0].substring(linesRaw[0].length - 2) === "\r\n";
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