import * as HistoryUtil from "../../../../util/history-util";
import {handleRequest} from "../SearchBoxContainer";
import * as SelectedActions from "../../../../store/selected/actions";

let dispatch;

describe('search box', () => {
    beforeEach(() => {
        HistoryUtil.redirect = jest.fn();
        dispatch = jest.fn();
        SelectedActions.selectOrganization = jest.fn();
        SelectedActions.selectOrder = jest.fn();
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
        handleRequest(chosenRequest, dispatch);

        expect(SelectedActions.selectOrganization.mock.calls.length).toBe(1);
        expect(SelectedActions.selectOrganization.mock.calls[0][0]).toBe(chosenRequest.info.organizationId);

        expect(HistoryUtil.redirect.mock.calls.length).toBe(1);
        expect(HistoryUtil.redirect.mock.calls[0][0]).toBe("/org");
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

        handleRequest(chosenRequest, dispatch);

        expect(SelectedActions.selectOrder.mock.calls.length).toBe(1);
        expect(SelectedActions.selectOrder.mock.calls[0][0]).toBe(chosenRequest.info.orderId);

        expect(SelectedActions.selectOrganization.mock.calls.length).toBe(1);
        expect(SelectedActions.selectOrganization.mock.calls[0][0]).toBe(chosenRequest.info.organizationId);

        expect(HistoryUtil.redirect.mock.calls.length).toBe(1);
        expect(HistoryUtil.redirect.mock.calls[0][0]).toBe("/form");
    });
});