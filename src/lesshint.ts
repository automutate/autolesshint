import { IMutation } from "automutate/lib/mutation";

/**
 * Complaint result from running Lesshint.
 */
export interface ILesshintComplaint {
    /**
     * Starting column number of the complaint.
     */
    column: number;

    /**
     * File name of the offending file.
     */
    file: string;

    /**
     * Full path of the offending file.
     */
    fullPath: string;

    /**
     * Starting line number of the complaint.
     */
    line: number;

    /**
     * Name of the complaining linter.
     */
    linter: string;

    /**
     * Complaint message.
     */
    message: string;

    /**
     * Character offset the complaint starts at.
     */
    position: number;

    /**
     * Severity of the lint.
     */
    severity: "error" | "warning";

    /**
     * Offending piece of code.
     */
    source: string;

    /**
     * Suggested mutation(s) to fix the complaint.
     */
    suggestedFix?: IMutation;
}

/**
 * Lesshint configuration options, keyed by rule name.
 */
export interface ILesshintConfig {
    [i: string]: any;
}
