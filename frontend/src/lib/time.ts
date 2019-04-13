/**
 * Transform a number to a string and add leading characters
 * @param num The number to left pad
 * @param len The desired length of the formatted number (defaults to 2)
 * @param ch The desired padding character (defaults to "0")
 */
function lz(num: number, len: number = 2, ch = "0"): string {
    let sign = Math.sign(num) === -1 ? '-' : '';
    return sign + new Array(len).concat([Math.abs(num)]).join(ch).slice(-len);
}

/**
 * Transform any JS parseable date string to the following format:
 * YYYY-MM-DD HH:MM:SS 'UTC'
 * @param dateTimeString The date/datetime string to be formatted
 */
export function toDateString(dateTimeString: string) {
    const dateObj = new Date(dateTimeString);

    const y = dateObj.getFullYear();
    const M = (dateObj.getMonth() + 1);
    const d = dateObj.getDay();
    const h = dateObj.getHours();
    const m = dateObj.getMinutes();
    const s = dateObj.getSeconds();

    return `${y}-${lz(M)}-${lz(d)} ${lz(h)}:${lz(m)}:${lz(s)} UTC`
}
