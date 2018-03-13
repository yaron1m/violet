import React from 'react';
import OrderPageSections from './Sections';
import OrderPageTitle from './OrderPageTitleContainer';
import OrderActionButtons from './action-buttons/index';
import OrderEditTimes from './OrderEditTimesContainer'

export default class OrderForm extends React.Component {

    render() {

        return (
            <div>
                <OrderPageTitle/>
                <OrderEditTimes/>

                <OrderActionButtons/>

                <OrderPageSections/>
            </div>
        );
    }
}
