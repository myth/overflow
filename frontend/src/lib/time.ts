export function toDateString(dateTimeString: string) {
    const dateObj = new Date(dateTimeString);

    const y = dateObj.getFullYear();
    const M = dateObj.getMonth() + 1;
    const d = dateObj.getDay();
    const h = dateObj.getHours();
    const m = dateObj.getMinutes();
    const s = dateObj.getSeconds();

    const MStr = M < 10 ? `0${M}` : `${M}`;
    const dStr = d < 10 ? `0${d}` : `${d}`;
    const hStr = h < 10 ? `0${h}` : `${h}`;
    const mStr = m < 10 ? `0${m}` : `${m}`;
    const sStr = s < 10 ? `0${s}` : `${s}`

    return `${y}-${MStr}-${dStr} ${hStr}:${mStr}:${sStr} UTC`
}
