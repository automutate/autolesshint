import * as fs from "fs";

/**
 * Retrieves the contents of a file.
 *
 * @param fileName   Name of a file.
 * @returns A Promise for the contents of the file.
 */
export interface IFileContentsGetter {
    (fileName: string): Promise<string>;
}

/**
 * Retrieves the contents of a file.
 *
 * @param fileName   Name of a file.
 * @returns A Promise for the contents of the file.
 */
export const fileContentsGetter = async (fileName: string): Promise<string> =>
    new Promise<string>((resolve, reject): void => {
        fs.readFile(fileName, (error: Error | undefined, data: Buffer): void => {
            error ? reject(error) : resolve(data.toString());
        });
    });
