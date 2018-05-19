import React from 'react';
import AbstractCustomField from "../AbstractCustomField";
import Sizes from "../../../util/consts/sizes";

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
        size: Sizes.XL,
        ...otherProps,
    };

    return new AbstractCustomField(props);

}

describe('Abstract Field Class', () => {

    it('Constructor - fields are correct', () => {
        const target = setup({});

        expect(target.name).toEqual("organizationName");
        expect(target.title).toEqual("שם הארגון");
        expect(target.state).toEqual({value: "Google"});
        expect(target.basicStyle).toEqual({
            marginRight: 20,
            marginBottom: 10,
            verticalAlign: "bottom",
        });
    });

    it('GetWidth - correct', () => {
        expect(setup().width).toEqual(200);
        expect(setup({size: Sizes.S}).width).toEqual(50);
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

    it('componentWillReceiveProps - value not changed - state not changed', () => {
        const target = setup();
        target.setState = jest.fn();

        const newProps = {
            values: {
                organizationName: "Google",
            },
        };
        target.componentWillReceiveProps(newProps);

        expect(target.setState.mock.calls.length).toBe(0);
    });


    it('componentWillReceiveProps - value changed - state changed', () => {
        const target = setup();
        target.setState = jest.fn();

        const newProps = {
            values: {
                organizationName: "Amazon",
            },
        };
        target.componentWillReceiveProps(newProps);

        expect(target.setState.mock.calls.length).toBe(1);
        expect(target.setState.mock.calls[0][0].value).toBe("Amazon");
    });

    it('componentWillReceiveProps - value changed to undefined - state changed to empty string', () => {
        const target = setup();
        target.setState = jest.fn();

        const newProps = {
            values: {},
        };
        target.componentWillReceiveProps(newProps);

        expect(target.setState.mock.calls.length).toBe(1);
        expect(target.setState.mock.calls[0][0].value).toBe("");
    });

    it('handleChange - new value - called with the name', () => {
        const updateAction = jest.fn();
        const target = setup({updateAction});

        target.handleChange("Amazon");

        expect(updateAction.mock.calls.length).toBe(1);
        expect(updateAction.mock.calls[0]).toEqual(["organizationName", "Amazon"]);
    });

    it('getErrorText - field is not required - empty string', () => {
        expect(setup().getErrorText()).toEqual("");
    });

    it('getErrorText - required but has value - empty string', () => {
        expect(setup({requiredFields: ["organizationName"]}).getErrorText()).toEqual("");
    });

    it('getErrorText - required with no value - get required string', () => {
        expect(setup({
            requiredFields: ["organizationName"],
            values: {}
        }).getErrorText()).toEqual("שדה חובה");
    });
});