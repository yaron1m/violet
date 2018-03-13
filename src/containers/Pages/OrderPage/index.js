import React from 'react';
import OrderPageSections from './Sections';
import OrderPageTitle from './OrderPageTitleContainer';
import OrderActionButtons from './action-buttons/index';
import OrderTimes from './order-page-footer'

export default class OrderForm extends React.Component {

    render() {

        return (
            <div>
                <OrderPageTitle/>
                <OrderTimes/>

                <OrderActionButtons/>

                <OrderPageSections/>
            </div>
        );
    }
}
