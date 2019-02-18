import {ILectureTime} from "../Interfaces/IOrder";
import {IPublicCourseLecture} from "../Interfaces/IPublicCourse";

interface ITime {
    hours: number;
    minutes: number;
}

export function calculateDuration(lectureTime: ILectureTime | IPublicCourseLecture) {
    if (!lectureTime || !lectureTime.startTime || !lectureTime.endTime)
        return "";

    if (!isValidTimeFormat(lectureTime.startTime) || !isValidTimeFormat(lectureTime.endTime))
        return "";

    const startT = toTime(lectureTime.startTime), endT = toTime(lectureTime.endTime);

    return timeToString(subtractTime(endT, startT));
}

export function calculatePreparationTimes(lectureTime: ILectureTime) {
    if (!lectureTime || !lectureTime.startTime || !lectureTime.travelTime)
        return undefined;

    if (!isValidTimeFormat(lectureTime.startTime) || !isValidTimeFormat(lectureTime.travelTime))
        return undefined;

    const lectureStartTime = toTime(lectureTime.startTime);
    const travelTime = toTime(lectureTime.travelTime);

    const arriveTime = subtractTime(lectureStartTime, {hours: 0, minutes: 30});
    const leaveHomeTime = subtractTime(arriveTime, travelTime);
    const wakeUpTime = subtractTime(leaveHomeTime, {hours: 0, minutes: 30});

    return {
        wakeUpTime: timeToString(wakeUpTime),
        leaveHomeTime: timeToString(leaveHomeTime),
        arriveTime: timeToString(arriveTime),
        lectureStartTime: timeToString(lectureStartTime),
    };

}

export function toDateFormat(date: Date) {
    if (date.getHours() >= 20)
        date.setHours(date.getHours() + 4); // Increment day by one for time zone change

    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear();

    return year + "-" + month + "-" + day;
}

export function hasDatePassed(dateString: string) {
    const now = new Date();
    now.setHours(7);
    return now >= new Date(dateString);
}

function isValidTimeFormat(time: string) {
    return /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(time);
}

function toTime(time: string) {
    const timeArr = time.split(":");

    return {
        hours: parseInt(timeArr[0]),
        minutes: parseInt(timeArr[1]),
    };
}

function subtractTime(time: ITime, timeToSubtract: ITime): ITime {
    let hours = time.hours - timeToSubtract.hours;
    if (hours < 0)
        hours = 24 + hours;

    let minutes = time.minutes - timeToSubtract.minutes;
    if (minutes < 0) {
        hours--;
        minutes += 60;
    }

    return {
        hours,
        minutes
    };
}

function timeToString(time: ITime) {
    return pad(time.hours) + ":" + pad(time.minutes);
}

function pad(num: number) {
    if (num >= 10)
        return num.toString();
    return "0" + num.toString();
}