import {calculateDuration, calculatePreparationTimes, toDateFormat} from "./TimeUtil";
import {ILectureTime} from "../index";

describe("time-util", () => {

    it("calculateDuration - normal times - calculate duration", () => {
        const startTime = "10:12";
        const endTime = "11:36";
        const lectureTime = {startTime, endTime} as ILectureTime;
        expect(calculateDuration(lectureTime)).toEqual("01:24");
    });

    it("calculateDuration - short startTime - calculate duration", () => {
        const startTime = "7:12";
        const endTime = "11:36";
        const lectureTime = {startTime, endTime} as ILectureTime;
        expect(calculateDuration(lectureTime)).toEqual("04:24");
    });

    it("calculateDuration - short startTime and endTime - calculate duration", () => {
        const startTime = "7:12";
        const endTime = "9:36";
        const lectureTime = {startTime, endTime} as ILectureTime;
        expect(calculateDuration(lectureTime)).toEqual("02:24");
    });

    it("calculateDuration - startTime > endTime - calculate duration", () => {
        const startTime = "23:15";
        const endTime = "1:30";
        const lectureTime = {startTime, endTime} as ILectureTime;
        expect(calculateDuration(lectureTime)).toEqual("02:15");
    });

    it("calculateDuration - less than one hour with different starting hours - calculate duration", () => {
        const startTime = "14:45";
        const endTime = "15:05";
        const lectureTime = {startTime, endTime} as ILectureTime;
        expect(calculateDuration(lectureTime)).toEqual("00:20");
    });

    it("calculateDuration - invalid StartTime - return null", () => {
        const startTime = "101:14";
        const endTime = "11:36";
        const lectureTime = {startTime, endTime} as ILectureTime;
        expect(calculateDuration(lectureTime)).toEqual("");
    });

    it("calculateDuration - invalid StartTime - return null", () => {
        const startTime = "A:14";
        const endTime = "11:36";
        const lectureTime = {startTime, endTime} as ILectureTime;
        expect(calculateDuration(lectureTime)).toEqual("");
    });

    it("calculateDuration - invalid StartTime - return null", () => {
        const startTime = "-7:14";
        const endTime = "11:36";
        const lectureTime = {startTime, endTime} as ILectureTime;
        expect(calculateDuration(lectureTime)).toEqual("");
    });

    it("calculateDuration - empty StartTime - return null", () => {
        const startTime = "";
        const endTime = "11:36";
        const lectureTime = {startTime, endTime} as ILectureTime;
        expect(calculateDuration(lectureTime)).toEqual("");
    });

    it("returns undefined when start time is invalid", () => {
        const startTime = "99";
        const travelTime = "11:36";
        const lectureTime = {startTime, travelTime} as ILectureTime;
        expect(calculatePreparationTimes(lectureTime)).toBeUndefined();
    });

    it("returns undefined when travel time is invalid", () => {
        const startTime = "11:39";
        const travelTime = "#";
        const lectureTime = {startTime, travelTime} as ILectureTime;
        expect(calculatePreparationTimes(lectureTime)).toBeUndefined();
    });

    it("returns Preparation Times when lecture time is valid", () => {
        const startTime = "9:39";
        const travelTime = "00:21";
        const lectureTime = {startTime, travelTime} as ILectureTime;
        expect(calculatePreparationTimes(lectureTime)).toEqual({
            wakeUpTime: "08:18",
            leaveHomeTime: "08:48",
            arriveTime: "09:09",
            lectureStartTime: "09:39"
        });
    });

    it("converts date to format", () => {
        const date = new Date(2019, 8, 15, 14, 21, 33);
        expect(toDateFormat(date)).toEqual("2019-09-15");
    });

    it("advances the day for time zones considerations", () => {
        const date = new Date(2019, 8, 15, 22, 21, 33);
        expect(toDateFormat(date)).toEqual("2019-09-16");
    });
});