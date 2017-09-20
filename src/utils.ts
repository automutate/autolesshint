/**
 * Determines whether to use a Unix or Windows endline in a file.
 *
 * @param linesRaw   Raw file contents, including endlines.
 * @returns The correct linebreak characters for the file.
 * @todo Remove this in favor of lesshint#342.
 */
export const getLinebreakStyle = (linesRaw: string[]): "\n" | "\r\n" => {
    const useWindowsEndlines = (linesRaw.length > 1 && linesRaw[0][linesRaw[0].length - 1] === "\n")
        ? linesRaw[0].substring(linesRaw[0].length - 2) === "\r\n"
        : process.platform.indexOf("win") === 0;

    return useWindowsEndlines ? "\r\n" : "\n";
};
