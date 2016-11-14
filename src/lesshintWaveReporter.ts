export type LesshintComplaint = any;

/**
 * Lesshint reporter that keeps waves of complaints.
 */
export class LesshintWaveReporter {
    /**
     * Most recent wave of reported complaints from Lesshint.
     */
    private complaints: LesshintComplaint[] = [];

    /**
     * Receives a wave of complaints from Lesshint.
     */
    public report(complaints: LesshintComplaint[]): void {
        this.complaints.push(...complaints);
    }

    /**
     * Pumps and wipes the most recent complaints wave.
     * 
     * @returns The most recent complaints wave.
     */
    public pump(): any[] {
        const pumpedComplaints: any[] = this.complaints;

        this.complaints = [];

        return pumpedComplaints;
    }
}
