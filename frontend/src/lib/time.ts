import { leftPad } from "./utils";

/**
 * Transform any JS parseable date string to the following format:
 * YYYY-MM-DD HH:MM:SS 'UTC'
 * @param dateTimeString The date/datetime string to be formatted
 */
export function toDateString(dateTimeString: string) {
    const dateObj = new Date(dateTimeString);

    const y = dateObj.getFullYear().toString();
    const M = (dateObj.getMonth() + 1).toString();
    const d = dateObj.getDay().toString();
    const h = dateObj.getHours().toString();
    const m = dateObj.getMinutes().toString();
    const s = dateObj.getSeconds().toString();

    return `${y}-${leftPad(M, 2, "0")}-${leftPad(d, 2, "0")}
        ${leftPad(h, 2, "0")}:${leftPad(m, 2, "0")}:${leftPad(s, 2, "0")} UTC`
}
