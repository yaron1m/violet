/* eslint-disable no-magic-numbers */

export function calculateDuration(lectureTime) {
    if (!lectureTime || !lectureTime.startTime || !lectureTime.endTime)
        return "";

    if (!isValidTimeFormat(lectureTime.startTime) || !isValidTimeFormat(lectureTime.endTime))
        return "";

    return getDuration(lectureTime.startTime, lectureTime.endTime);
}

function isValidTimeFormat(time) {
    return /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(time);
}

function getDuration(startTime, endTime) {
    if (!startTime || !endTime)
        return null;
    const start = startTime.split(':');
    const end = endTime.split(':');

    const sh = start[0], sm = start[1], eh = end[0], em = end[1];

    let hours = eh - sh;
    if (hours < 0)
        hours = 24 + hours;

    if (em - sm < 0)
        return pad(hours - 1) + ':' + pad(em - sm + 60);
    return pad(hours) + ':' + pad(em - sm);
}

function pad(number) {
    if (number >= 10)
        return number.toString();
    return '0' + number.toString();
}

export function toDateFormat(date) {
    if (date.getHours() >= 20)
        date.setHours(date.getHours() + 4); //Increment day by one for time zone change

    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear();

    return year + "-" + month + "-" + day;
}

export function hasDatePassed(dateString) {
    const now = new Date();
    now.setHours(7);
    return now >= new Date(dateString);
}