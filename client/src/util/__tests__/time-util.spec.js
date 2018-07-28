import {calculateDuration} from "../TimeUtil";

describe('time-util', () => {

    it('calculateDuration - normal times - calculate duration', () => {
        const startTime = "10:12";
        const endTime = "11:36";
        const lectureTime = {startTime, endTime};
        expect(calculateDuration(lectureTime)).toEqual("01:24");
    });

    it('calculateDuration - short startTime - calculate duration', () => {
        const startTime = "7:12";
        const endTime = "11:36";
        const lectureTime = {startTime, endTime};
        expect(calculateDuration(lectureTime)).toEqual("04:24");
    });

    it('calculateDuration - short startTime and endTime - calculate duration', () => {
        const startTime = "7:12";
        const endTime = "9:36";
        const lectureTime = {startTime, endTime};
        expect(calculateDuration(lectureTime)).toEqual("02:24");
    });

    it('calculateDuration - startTime > endTime - calculate duration', () => {
        const startTime = "23:15";
        const endTime = "1:30";
        const lectureTime = {startTime, endTime};
        expect(calculateDuration(lectureTime)).toEqual("02:15");
    });

    it('calculateDuration - less than one hour with different starting hours - calculate duration', () => {
        const startTime = "14:45";
        const endTime = "15:05";
        const lectureTime = {startTime, endTime};
        expect(calculateDuration(lectureTime)).toEqual("00:20");
    });

    it('calculateDuration - invalid StartTime - return null', () => {
        const startTime = "101:14";
        const endTime = "11:36";
        const lectureTime = {startTime, endTime};
        expect(calculateDuration(lectureTime)).toEqual("");
    });

    it('calculateDuration - invalid StartTime - return null', () => {
        const startTime = "A:14";
        const endTime = "11:36";
        const lectureTime = {startTime, endTime};
        expect(calculateDuration(lectureTime)).toEqual("");
    });

    it('calculateDuration - invalid StartTime - return null', () => {
        const startTime = "-7:14";
        const endTime = "11:36";
        const lectureTime = {startTime, endTime};
        expect(calculateDuration(lectureTime)).toEqual("");
    });

    it('calculateDuration - empty StartTime - return null', () => {
        const startTime = "";
        const endTime = "11:36";
        const lectureTime = {startTime, endTime};
        expect(calculateDuration(lectureTime)).toEqual("");
    });
});