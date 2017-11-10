import React from 'react';
import {shallow} from 'enzyme'
import {SaveOrderButton} from '../save-order';
import {orderPageLabels} from "../../../../../store/labels/pages/order-page-labels";
import {SHOW_REQUIRED_FIELDS} from "../../../../../store/required-fields/action-types";

function setup(extraProps) {
    const props = {
        labels: orderPageLabels,
        // organizations:{},
        selectedOrganization: {},
        // isSelectedOrganization: false,
        // selectedOrder: {},
        // isSelectedOrder: false,
        // nextOrderId: 5,
        // nextOrganizationId: 10,
        // orderMissingFields: [],
        dispatch: jest.fn(),
        ...extraProps
    };

    const enzymeWrapper = shallow(<SaveOrderButton {...props} />);

    return {
        enzymeWrapper,
        props,
    };
}

describe('save order button', () => {

    it('shouldSave - organization not selected - false', () => {
        const {enzymeWrapper, props} = setup({
            isSelectedOrganization: false,
        });

        expect(enzymeWrapper.instance().shouldSave())
            .toBeFalsy();

        expect(props.dispatch.mock.calls.length).toBe(1);
        expect(props.dispatch.mock.calls[0][0].title).toBe(props.labels.dialog.noOrganizationSelectedTitle);
    });

    it('shouldSave - there are missing fields - false', () => {
        const {enzymeWrapper, props} = setup({
            isSelectedOrganization: true,
            orderMissingFields: ["field"]
        });

        expect(enzymeWrapper.instance().shouldSave())
            .toBeFalsy();

        expect(props.dispatch.mock.calls.length).toBe(2);
        expect(props.dispatch.mock.calls[0][0].type).toBe(SHOW_REQUIRED_FIELDS);
        expect(props.dispatch.mock.calls[1][0].title).toBe(props.labels.dialog.missingFieldsTitle);
    });

    it('shouldSave - all valid - true', () => {
        const {enzymeWrapper} = setup({
            isSelectedOrganization: false,
            missingFields: []
        });

        expect(enzymeWrapper.instance().shouldSave())
            .toBeFalsy();
    });
});