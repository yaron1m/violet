import React from 'react';
import {shallow} from 'enzyme'
import {SaveOrderButton} from '../save-order';
import {orderPageLabels} from "../../../../../store/labels/pages/order-page-labels";

function setup(props) {
    const thisProps = {
        labels: orderPageLabels,
        // organizations:{},
        selectedOrganization: {},
        // isSelectedOrganization: false,
        // selectedOrder: {},
        // isSelectedOrder: false,
        // nextOrderId: 5,
        // nextOrganizationId: 10,
        // orderMissingFields: [],
        dispatch: jest.fn,
        ...props
    };

    const enzymeWrapper = shallow(<SaveOrderButton {...thisProps} />);

    return {
        props,
        enzymeWrapper
    };
}

describe('store/labels/selectors', () => {

    it('shouldSave - organization not selected - false', () => {
        const {enzymeWrapper} = setup({isSelectedOrganization: false});

        expect(enzymeWrapper.instance().shouldSave())
            .toBeFalsy();
    });

    it('shouldSave - there are missing fields - false', () => {
        const {enzymeWrapper} = setup({missingFields: ["field"]});

        expect(enzymeWrapper.instance().shouldSave())
            .toBeFalsy();
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