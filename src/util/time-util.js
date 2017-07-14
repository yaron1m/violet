export function calculateDuration(lectureTimes) {
    if (!lectureTimes)
        return;
    return lectureTimes.map((lectureTime) =>
        Object.assign(lectureTime, {duration: getDuration(lectureTime.startTime, lectureTime.endTime)})
    );
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