import React from 'react';
import PaymentPageTitle from './payment-page-title';
import WaitingPaymentTable from '../../tables/waiting-payment-table';

export default class PaymentPage extends React.Component {
    render() {
        return (
            <div>
                <PaymentPageTitle/>

                <WaitingPaymentTable/>
            </div>
        );
    }
}
