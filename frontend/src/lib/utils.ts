/**
 * Pads a given string with spaces or an optionally provided character to match
 * the specified length.
 * @param str The input string
 * @param len The desired length of the final string
 * @param ch An optional character to pad with, which defaults to space
 */
export function leftPad(str: string, len: number, ch = " "): string {
    len = len - str.length + 1;
    return len > 0 ? new Array(len).join(ch) + str : str;
}
