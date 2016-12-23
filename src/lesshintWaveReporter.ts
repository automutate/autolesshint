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
    suggestedFix: IMutation;
};

/**
 * Lesshint reporter that keeps waves of complaints.
 */
export class LesshintWaveReporter {
    /**
     * Most recent wave of reported complaints from Lesshint.
     */
    private complaints: ILesshintComplaint[] = [];

    /**
     * Receives a wave of complaints from Lesshint.
     */
    public report(complaints: ILesshintComplaint[]): void {
        this.complaints.push(...complaints);
    }

    /**
     * Pumps and wipes the most recent complaints wave.
     * 
     * @returns The most recent complaints wave.
     */
    public pump(): ILesshintComplaint[] {
        const pumpedComplaints: ILesshintComplaint[] = this.complaints;

        this.complaints = [];

        return pumpedComplaints;
    }
}
