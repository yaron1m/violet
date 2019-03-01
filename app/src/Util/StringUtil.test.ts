import {cutIfLong, getValueOrEmptyString, isEmptyValue, moneyFormat} from "./StringUtil";

describe("string-util", () => {

    it("isEmptyValue - valid - true", () => {
        const object = {
            key: "value"
        };
        expect(isEmptyValue(object, "key")).toBeFalsy();
    });

    it("isEmptyValue - no such key - false", () => {
        const object = {};
        expect(isEmptyValue(object, "key")).toBeTruthy();
    });

    it("isEmptyValue - null value - false", () => {
        const object = {
            key: undefined
        };
        expect(isEmptyValue(object, "key")).toBeTruthy();
    });

    it("isEmptyValue - undefined value - false", () => {
        const object = {
            key: undefined
        };
        expect(isEmptyValue(object, "key")).toBeTruthy();
    });

    it("isEmptyValue - empty value - true", () => {
        const object = {
            key: ""
        };
        expect(isEmptyValue(object, "key")).toBeTruthy();
    });

    it("getValueOrEmptyString - valid - value", () => {
        const object = {
            key: "value"
        };
        expect(getValueOrEmptyString(object, "key")).toEqual("value");
    });

    it("cutIfLong - valid - valid", () => {
        expect(cutIfLong("abcdefg", 6)).toEqual("abc...");
    });

    it("cutIfLong - empty input - undefined", () => {
        expect(cutIfLong("", 3)).toEqual("");
    });

    it("cutIfLong - short input - undefined", () => {
        expect(cutIfLong("abc", 5)).toEqual("abc");
        expect(cutIfLong("abcde", 5)).toEqual("abcde");
    });

    it("moneyFormat - valid - valid", () => {
        expect(moneyFormat("1")).toEqual("1.00 ₪");
        expect(moneyFormat("1234")).toEqual("1,234.00 ₪");
        expect(moneyFormat("1234567")).toEqual("1,234,567.00 ₪");
        expect(moneyFormat("1.2345")).toEqual("1.23 ₪");
        expect(moneyFormat("1.9999")).toEqual("2.00 ₪");
        expect(moneyFormat("012345.1234")).toEqual("12,345.12 ₪");
    });

    it("moneyFormat - empty input - input", () => {
        expect(moneyFormat("")).toEqual("");
    });

    it("moneyFormat - non numeric input - input", () => {
        expect(moneyFormat("AAA")).toEqual("AAA");
    });
});