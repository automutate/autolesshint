import { ILesshintComplaint, ILesshintConfig } from "./lesshint";
import { RootSuggester } from "./suggesters/rootSuggester";


/**
 * Lesshint reporter that keeps waves of complaints.
 */
export class LesshintWaveReporter {
    /**
     * Generates suggesters for complaints.
     */
    private readonly rootSuggester: RootSuggester = new RootSuggester();

    /**
     * Lesshint configuration options, keyed by rule name.
     */
    private readonly configs: ILesshintConfig;

    /**
     * Most recent wave of reported complaints from Lesshint.
     */
    private complaints: ILesshintComplaint[] = [];

    /**
     * Initializes a new instance of the LesshintWaveReporter class.
     * 
     * @param config   Lesshint configuration options, keyed by rule name.
     */
    public constructor(configs: ILesshintConfig) {
        this.configs = configs;
    }

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
    public async pump(): Promise<ILesshintComplaint[]> {
        const pumpedComplaints: ILesshintComplaint[] = this.complaints;

        this.complaints = [];

        await Promise.all(
            pumpedComplaints.map(
                async (complaint: ILesshintComplaint): Promise<void> => {
                    if (complaint.suggestedFix) {
                        return;
                    }

                    const suggestedFix = await this.rootSuggester.suggestMutation(complaint, this.configs[complaint.linter]);
                    if (suggestedFix) {
                        complaint.suggestedFix = suggestedFix;
                    }
                }));

        return pumpedComplaints;
    }
}
