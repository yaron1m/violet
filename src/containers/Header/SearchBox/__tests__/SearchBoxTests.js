import React from 'react';
import {shallow} from 'enzyme'
import SearchBox from '../SearchBox';
import * as HistoryUtil from "../../../../util/history-util";

const props = {
    hintText: "hintText",
    organizations: {
        123: {
            id: "organizationId",
            organizationName: "name",
        }
    },
    orders: [
        {
            id: "orderId",
            organizationId: 123,
            organizationName: "organizationName",
        }
    ],
};

let enzymeWrapper;

describe('search box', () => {
    beforeEach(() => {
        HistoryUtil.redirect = jest.fn();
        props.selectOrganization = jest.fn();
        props.selectOrder = jest.fn();
        enzymeWrapper = shallow(<SearchBox {...props} />);
    });

    it('handleRequest - enter press - nothing happens', () => {
        enzymeWrapper.instance().handleRequest({}, -1);

        expect(props.selectOrganization.mock.calls.length).toBe(0);
        expect(props.selectOrder.mock.calls.length).toBe(0);
    });

    it('handleRequest - choose organization - load organization action', () => {
        const chosenRequest = {
            text: null,
            info: {
                type: 0,
                organizationId: 123,
            },
            value: null,
        };

        enzymeWrapper.instance().handleRequest(chosenRequest, 99);

        expect(props.selectOrganization.mock.calls.length).toBe(1);
        expect(props.selectOrganization.mock.calls[0][0]).toBe(chosenRequest.info.organizationId);

        expect(HistoryUtil.redirect.mock.calls.length).toBe(1);
        expect(HistoryUtil.redirect.mock.calls[0][1]).toBe("/org");
    });

    it('handleRequest - choose order - load order action', () => {
        const chosenRequest = {
            text: null,
            info: {
                type: 1,
                orderId: "orderId",
                organizationId: "organizationId"
            },
            value: null,
        };

        enzymeWrapper.instance().handleRequest(chosenRequest, 99);

        expect(props.selectOrder.mock.calls.length).toBe(1);
        expect(props.selectOrder.mock.calls[0][0]).toBe(chosenRequest.info.orderId);

        expect(props.selectOrganization.mock.calls.length).toBe(1);
        expect(props.selectOrganization.mock.calls[0][0]).toBe(chosenRequest.info.organizationId);

        expect(HistoryUtil.redirect.mock.calls.length).toBe(1);
        expect(HistoryUtil.redirect.mock.calls[0][1]).toBe("/form");
    });

    it('handleRequest - choose organization - search text is set to empty', () => {
        const chosenRequest = {
            text: null,
            info: {
                type: 0,
                organizationId: 123,
            },
            value: null,
        };

        enzymeWrapper.instance().setState({searchText: "AAA"});

        enzymeWrapper.instance().handleRequest(chosenRequest, 99);

        expect(enzymeWrapper.instance().state.searchText).toEqual("");
    });
});