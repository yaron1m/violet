import React from 'react';
import FollowUpPageTitle from './follow-up-page-title';
import FollowUpOrdersTable from '../../tables/follow-up-orders-table';

export default class OrganizationPage extends React.Component {
    render() {
        return (
            <div>
                <FollowUpPageTitle/>

                <FollowUpOrdersTable/>
            </div>
        );
    }
}
