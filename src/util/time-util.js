export function calculateDuration(lectureTime) {
    if (!lectureTime)
        return null;

    if (!isValidFormat(lectureTime.startTime) || !isValidFormat(lectureTime.endTime))
        return null;

    return getDuration(lectureTime.startTime, lectureTime.endTime);
}

function isValidFormat(time) {
    const s = time.split(':');
    if(s.length !== 2)
        return false;

    if( s[1].length !== 2)
        return false;

    return s[0].length !== 1 || s[0].length !== 2;
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