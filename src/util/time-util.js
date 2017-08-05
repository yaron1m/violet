export function calculateDuration(lectureTime) {
    if (!lectureTime)
        return null;

    if (!isValidFormat(lectureTime.startTime) || !isValidFormat(lectureTime.endTime))
        return null;

    return getDuration(lectureTime.startTime, lectureTime.endTime);
}

function isValidFormat(time) {
    return /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(time);
}

function getDuration(startTime, endTime) {
    if (!startTime || !endTime || startTime > endTime)
        return;
    const s = startTime.split(':');
    const e = endTime.split(':');
    const sh = s[0], sm = s[1], eh = e[0], em = e[1];
    if (em - sm < 0)
        return pad(eh - sh - 1) + ':' + pad(em - sm + 60);
    return pad(eh - sh) + ':' + pad(em - sm);
}

function pad(number) {
    if (number >= 10)
        return number.toString();
    return '0' + number.toString();
}