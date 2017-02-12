import { ITextDeleteMutation } from "automutate/lib/mutators/textDeleteMutator";
import { ITextInsertMutation } from "automutate/lib/mutators/textInsertMutator";

import { ILesshintComplaint } from "../lesshint";
import { IFileInfo, ISuggester } from "../suggester";

/**
 * Configuration options for the space_between_parens rule.
 */
export interface ISpaceBetweenParensConfig {
    style?: "no_space" | "one_space";
}

/**
 * Adds fix suggestions for the space_between_parens rule.
 */
export class SpaceBetweenParensSuggester implements ISuggester<ISpaceBetweenParensConfig> {
    /**
     * Suggests a mutation to fix a complaint.
     * 
     * @param complaint   Complaint result from running Lesshint.
     * @param config   Configuration options for the rule.
     * @param fileInfo   Contents of the source file in various forms.
     * @returns Suggested mutation for the fix.
     */
    public suggestMutation(complaint: ILesshintComplaint, config: ISpaceBetweenParensConfig, fileInfo: IFileInfo): ITextDeleteMutation | ITextInsertMutation {
        return config.style === "one_space"
            ? this.suggestOneSpaceMutation(complaint, fileInfo)
            : this.suggestNoSpaceMutation(complaint, fileInfo);
    }

    /**
     * Suggests a mutation to fix a complaint that there should be a space.
     * 
     * @param complaint   Complaint result from running Lesshint.
     * @param fileInfo   Contents of the source file in various forms.
     * @returns Suggested mutation for the fix.
     */
    private suggestOneSpaceMutation(complaint: ILesshintComplaint, fileInfo: IFileInfo): ITextInsertMutation {
        return {
            insertion: " ",
            range: {
                begin: complaint.position
            },
            type: "text-insert"
        };
    }

    /**
     * Suggests a mutation to fix a complaint that there should be no space.
     * 
     * @param complaint   Complaint result from running Lesshint.
     * @param fileInfo   Contents of the source file in various forms.
     * @returns Suggested mutation for the fix.
     */
    private suggestNoSpaceMutation(complaint: ILesshintComplaint, fileInfo: IFileInfo): ITextDeleteMutation {
        const spaceLength: number = fileInfo.text.substring(complaint.position).search(/\S+/gi);

        return {
            range: {
                begin: complaint.position,
                end: complaint.position + spaceLength
            },
            type: "text-delete"
        };
    }
}
