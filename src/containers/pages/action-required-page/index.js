import React from 'react';
import ActionRequiredPageTitle from './action-required-page-title';
import ActionRequiredOrdersTable from '../../tables/action-required-orders-table';

export default class ActionRequiredPage extends React.Component {
    render() {
        return (
            <div>
                <ActionRequiredPageTitle/>

                <ActionRequiredOrdersTable/>
            </div>
        );
    }
}
