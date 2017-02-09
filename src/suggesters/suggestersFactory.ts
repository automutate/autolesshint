import * as fs from "fs";
import * as path from "path";

import { ISuggester } from "../suggester";

/**
 * Suggesters, keyed by linter name.
 */
interface ISuggesters {
    [i: string]: ISuggester<any> | undefined;
}

/**
 * Finds and returns suggester instances for linter names.
 */
export class SuggestersFactory {
    /**
     * Suggesters, keyed by linter name.
     */
    private readonly suggesters: ISuggesters = {};

    /**
     * Directory to search for suggesters within.
     */
    private readonly dirName: string = __dirname;

    /**
     * Generates a suggester for a linter, if possible.
     * 
     * @param linter   Name of a Lesshint linter.
     * @returns A Promise for the equivalent suggester, if possible.
     */
    public async provide(linter: string): Promise<ISuggester<any> | undefined> {
        if (!(linter in this.suggesters)) {
            this.suggesters[linter] = await this.createSuggester(linter);
        }

        return this.suggesters[linter];
    }

    /**
     * Finds and creates a suggester for a linter, if possible.
     * 
     * @param linter   Name of a Lesshint linter.
     * @returns A Promise for the equivalent suggester, if possible.
     */
    private async createSuggester(linter: string): Promise<ISuggester<any> | undefined> {
        const suggesterName: string = linter[0].toUpperCase() + linter.substring(1) + "Suggester";
        const fileName: string = path.join(this.dirName, suggesterName) + ".js";
        const exists: boolean = await new Promise<boolean>((resolve) => {
            fs.exists(fileName, (exists: boolean): void => resolve(exists));
        });

        if (!exists) {
            return undefined;
        }

        return new (require(fileName)[suggesterName])();
    }
}
