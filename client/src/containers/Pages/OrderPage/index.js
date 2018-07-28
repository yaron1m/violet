import React from 'react';
import OrderPageSections from './Sections';
import OrderPageTitle from './OrderPageTitleContainer';
import OrderActionButtons from './ActionButtons';
import OrderEditTimes from './OrderEditTimesContainer'
import OrderStatusStepper from "./OrderStatusStepperContainer";

export default class OrderForm extends React.Component {

    render() {

        return (
            <React.Fragment>
                <OrderPageTitle/>
                <OrderStatusStepper/>
                <OrderEditTimes/>

                <OrderActionButtons/>

                <OrderPageSections/>
            </React.Fragment>
        );
    }
}
