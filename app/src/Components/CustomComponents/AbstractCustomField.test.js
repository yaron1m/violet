import React from 'react';
import AbstractCustomField from "./AbstractCustomField";
import {Size} from "../../Util/Constants/Size";

function setup(otherProps) {
    const labels = {
        titles: {
            organizationName: "שם הארגון",
        },
    };

    const props = {
        name: "organizationName",
        titles: labels.titles,
        values: {
            organizationName: "Google",
        },
        requiredFields: ["someField"],
        updateAction: jest.fn(),
        size: Size.XL,
        ...otherProps,
    };

    return new AbstractCustomField(props);
}

describe('Abstract Field Class', () => {

    it('Constructor - fields are correct', () => {
        const target = setup({});

        expect(target.name).toEqual("organizationName");
        expect(target.title).toEqual("שם הארגון");
        expect(target.state).toEqual({
            value: "Google",
            isRequired: false,
        });
        expect(target.basicStyle).toEqual({
            marginRight: 20,
            marginBottom: 10,
            verticalAlign: "bottom",
        });
    });

    it('GetWidth - correct', () => {
        expect(setup().width).toEqual(200);
        expect(setup({size: Size.S}).width).toEqual(50);
    });

    it('GetWidth - invalid size - return default', () => {
        const target = setup({size: "hello"});

        expect(target.width).toEqual(150);
    });

    it('validateProps - missing title - throws exception', () => {
        expect(() => setup({name: "hello"})).toThrow();
    });

    it('validateProps - missing updateAction - throws exception', () => {
        expect(() => setup({updateAction: null})).toThrow();
    });

    it('should return null when value is not changed', () => {
        const state = {
            value: "Google",
            isRequired: false,
        };

        const newProps = {
            name: "organizationName",
            values: {
                organizationName: "Google",
            },
        };
        const result = AbstractCustomField.getDerivedStateFromProps(newProps, state);

        expect(result).toBeNull();
    });

    it('should return state with a new value', () => {
        const state = {
            value: "Google",
            isRequired: false,
        };

        const newProps = {
            name: "organizationName",
            values: {
                organizationName: "Amazon",
            },
        };

        const result = AbstractCustomField.getDerivedStateFromProps(newProps, state);
        const expectedResult = {
            ...state,
            value: "Amazon",
        };

        expect(result).toEqual(expectedResult);
    });

    it('should return value as empty string when value changed to undefined', () => {
        const state = {
            name: "organizationName",
            value: "Google",
            isRequired: false,
        };

        const newProps = {
            values: {},
        };

        const result = AbstractCustomField.getDerivedStateFromProps(newProps, state);
        const expectedResult = {
            ...state,
            value: "",
        };

        expect(result).toEqual(expectedResult);
    });

    it('should mark isRequired as true when name is in required array', () => {
        const state = {
            value: "Google",
            isRequired: false,
        };

        const newProps = {
            name: "organizationName",
            values: {
                organizationName: "Google",
            },
            requiredFields: ["organizationName"]
        };

        const result = AbstractCustomField.getDerivedStateFromProps(newProps, state);

        expect(result.isRequired).toBeTruthy();
    });

    it('should mark isRequired as false when name is no longer required', () => {
        const state = {
            name: "organizationName",
            value: "Google",
            isRequired: true,
        };

        const newProps = {
            values: {
                organizationName: "Google",
            },
            requiredFields: ["otherField"]
        };

        const result = AbstractCustomField.getDerivedStateFromProps(newProps, state);

        expect(result.isRequired).toBeFalsy();
    });

    it('should not update state if was required and still not required', () => {
        const state = {
            value: "Google",
            isRequired: false,
        };

        const newProps = {
            name: "organizationName",
            values: {
                organizationName: "Google",
            },
            requiredFields: ["otherField"]
        };

        const result = AbstractCustomField.getDerivedStateFromProps(newProps, state);

        expect(result).toBeNull();
    });

    it('should not update state if was required and still required', () => {
        const state = {
            value: "Google",
            isRequired: true,
        };

        const newProps = {
            name: "organizationName",
            values: {
                organizationName: "Google",
            },
            requiredFields: ["organizationName"]
        };

        const result = AbstractCustomField.getDerivedStateFromProps(newProps, state);

        expect(result).toBeNull();
    });

    it('handleChange - new value - called with the name', () => {
        const updateAction = jest.fn();
        const target = setup({updateAction});

        target.handleChange("Amazon");

        expect(updateAction.mock.calls).toHaveLength(1);
        expect(updateAction.mock.calls[0]).toEqual(["organizationName", "Amazon"]);
    });

    it('shouldShowError - field is not required - false', () => {
        expect(setup().shouldShowError()).toBeFalsy();
    });

    it('shouldShowError - required but has value - false', () => {
        expect(setup({requiredFields: ["organizationName"]}).shouldShowError()).toBeFalsy();
    });

    it('shouldShowError - required with no value - true', () => {
        expect(setup({
            requiredFields: ["organizationName"],
            values: {}
        }).shouldShowError()).toBeTruthy();
    });
});