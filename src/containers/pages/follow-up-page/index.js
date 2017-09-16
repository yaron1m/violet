import React from 'react';
import FollowUpPageTitle from './follow-up-page-title';
import FollowUpOrdersSummary from './follow-up-orders-summary';

export default class OrganizationPage extends React.Component {
    render() {
        return (
            <div>
                <FollowUpPageTitle/>

                <FollowUpOrdersSummary/>
            </div>
        );
    }
}
