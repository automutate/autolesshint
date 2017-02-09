import { IMutation } from "automutate/lib/mutation";

import { ILesshintComplaint } from "../lesshintWaveReporter";
import { ISuggester } from "../suggester";
import { SuggestersFactory } from "./suggestersFactory";

/**
 * Adds fix suggestions to Lesshint complaints.
 */
export class RootSuggester {
    /**
     * Generates suggesters for complaints.
     */
    private readonly suggestersFactory: SuggestersFactory = new SuggestersFactory();

    /**
     * Suggests a mutation to fix a complaint, if possible.
     * 
     * @param complaint   Complaint result from running Lesshint.
     * @returns A Promise for a fix mutation, if possible.
     */
    public async suggestMutation(complaint: ILesshintComplaint): Promise<IMutation | undefined> {
        const suggester: ISuggester | undefined = await this.suggestersFactory.provide(complaint.linter);
        if (!suggester) {
            return undefined;
        }

        return suggester.suggestMutation(complaint);
    }
}