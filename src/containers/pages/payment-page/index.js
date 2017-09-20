import React from 'react';
import PaymentPageTitle from './payment-page-title';
import PaymentSummary from './payment-summary';

export default class PaymentPage extends React.Component {
    render() {
        return (
            <div>
                <PaymentPageTitle/>

                <PaymentSummary/>
            </div>
        );
    }
}
