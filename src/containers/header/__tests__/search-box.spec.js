import React from 'react';
import {shallow} from 'enzyme'
import {SearchBox} from '../search-box';
import labels from "../../../store/labels/reducer";
import * as HistoryUtil from "../../../util/history-util";
import * as selectors from "../../../store/selected/actions";

const props = {
    labels: labels().header,
    organizations: {
        123:        {
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
        props.dispatch = jest.fn();
        HistoryUtil.redirect = jest.fn();
        selectors.selectOrganization = jest.fn();
        selectors.selectOrder = jest.fn();
        enzymeWrapper = shallow(<SearchBox {...props} />);
    });

    it('handleRequest - enter press - nothing happens', () => {
        enzymeWrapper.instance().handleRequest({}, -1);

        expect(props.dispatch.mock.calls.length).toBe(0);
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

        expect(props.dispatch.mock.calls.length).toBe(1);

        expect(selectors.selectOrganization.mock.calls.length).toBe(1);
        expect(selectors.selectOrganization.mock.calls[0][0]).toBe(chosenRequest.info.organizationId);

        expect(HistoryUtil.redirect.mock.calls.length).toBe(1);
        expect(HistoryUtil.redirect.mock.calls[0][1]).toBe("/org");
    });

    it('handleRequest - choose order - load organization action', () => {
        const chosenRequest = {
            text: null,
            info: {
                type: 1,
                orderId: "orderId",
                organizationId: "organizationId",
            },
            value: null,
        };

        enzymeWrapper.instance().handleRequest(chosenRequest, 99);

        expect(props.dispatch.mock.calls.length).toBe(2);

        expect(selectors.selectOrder.mock.calls.length).toBe(1);
        expect(selectors.selectOrder.mock.calls[0][0]).toBe(chosenRequest.info.orderId);

        expect(selectors.selectOrganization.mock.calls.length).toBe(1);
        expect(selectors.selectOrganization.mock.calls[0][0]).toBe(chosenRequest.info.organizationId);

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