import React from 'react';
import OrganizationSection from "./organization-section";
import OrganizationPageTitle from './organiation-page-title';
import OrganizationActionButtons from './organiation-action-buttons';
import OrdersSummary from './orders-summary';

export default class OrganizationPage extends React.Component {
    render() {
        return (
            <div>
                <OrganizationPageTitle/>
                <OrganizationActionButtons/>

                <OrganizationSection/>

                <OrdersSummary/>
            </div>
        );
    }
}
