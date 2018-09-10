import { IFileContentsGetter } from "./fileContentsGetter";
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
     * Retrieves the contents of files.
     */
    private readonly fileContentsGetter: IFileContentsGetter;

    /**
     * Most recent wave of reported complaints from Lesshint.
     */
    private complaints: ILesshintComplaint[] = [];

    /**
     * Initializes a new instance of the LesshintWaveReporter class.
     *
     * @param config   Lesshint configuration options, keyed by rule name.
     * @param fileContentsGetter   Retrieves the contents of files.
     */
    public constructor(configs: ILesshintConfig, fileContentsGetter: IFileContentsGetter) {
        this.configs = configs;
        this.fileContentsGetter = fileContentsGetter;
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

                    const fileContents: string = await this.fileContentsGetter(complaint.fullPath);
                    const linesRaw: string[] = fileContents.match(/([^\r\n]*(?:\r?\n)|[^\r\n]+)/g) as string[];
                    const suggestedFix = await this.rootSuggester.suggestMutation(
                        complaint,
                        this.configs[complaint.linter] || {},
                        {
                            linesRaw,
                            text: fileContents
                        });

                    if (suggestedFix) {
                        complaint.suggestedFix = suggestedFix;
                    }
                }));

        return pumpedComplaints;
    }
}
