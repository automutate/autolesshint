import { ITextDeleteMutation } from "automutate/lib/mutators/textDeleteMutator";
import { ITextInsertMutation } from "automutate/lib/mutators/textInsertMutator";

import { ILesshintComplaint } from "../lesshint";
import { IFileInfo, ISuggester } from "../suggester";

export interface ISpaceBeforeBraceConfig {
    style?: "no_space" | "one_space";
}

/**
 * Adds fix suggestions for the spaceBeforeBrace rule.
 */
export class SpaceBeforeBraceSuggester implements ISuggester<ISpaceBeforeBraceConfig> {
    /**
     * Suggests a mutation to fix a complaint.
     *
     * @param complaint   Complaint result from running Lesshint.
     * @param config   Configuration options for the rule.
     * @param fileInfo   Contents of the source file in various forms.
     * @returns Suggested mutation for the fix.
     */
    public suggestMutation(complaint: ILesshintComplaint, config: ISpaceBeforeBraceConfig, fileInfo: IFileInfo): ITextDeleteMutation | ITextInsertMutation {
        return config.style === "one_space"
            ? this.suggestOneSpaceMutation(complaint, fileInfo)
            : this.suggestNoSpaceMutation(complaint, fileInfo);
    }

    /**
     * Suggests a mutation to fix a complaint that there should be a space.
     * This suggested either removes extra spaces before a brace or adds a single space.
     *
     * @param complaint   Complaint result from running Lesshint.
     * @param fileInfo   Contents of the source file in various forms.
     * @returns Suggested mutation for the fix.
     */
    private suggestOneSpaceMutation(complaint: ILesshintComplaint, fileInfo: IFileInfo): ITextInsertMutation | ITextDeleteMutation {
        const tooManySpaces = (/\s\s+/g).test(complaint.source);
        if (tooManySpaces) {
            const originalInput = fileInfo.linesRaw.join("");
            const spaceLength: number = fileInfo.text.substring(complaint.position).search(/\s+/gi);

            return {
                range: {
                    begin: originalInput.substring(0, complaint.position).replace(/\s*$/g, "").length + spaceLength,
                    end: complaint.position
                },
                type: "text-delete"
            };
        } else {
            return {
                insertion: " ",
                range: {
                    begin: complaint.position
                },
                type: "text-insert"
            };
        }
    }

    /**
     * Suggests a mutation to fix a complaint that there should be no space.
     *
     * @param complaint   Complaint result from running Lesshint.
     * @param fileInfo   Contents of the source file in various forms.
     * @returns Suggested mutation for the fix.
     */
    private suggestNoSpaceMutation(complaint: ILesshintComplaint, fileInfo: IFileInfo): ITextDeleteMutation {
        const originalInput = fileInfo.linesRaw.join("");
        const complaintStart = complaint.position - 1;

        return {
            range: {
                begin: complaintStart,
                end: originalInput.indexOf("{", complaintStart)
            },
            type: "text-delete"
        };
    }
}
