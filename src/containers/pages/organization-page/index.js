import React from 'react';
import OrganizationSection from "./organization-section";
import OrganizationPageTitle from './organiation-page-title';
import OrdersSummary from './orders-summary';
import OrganizationContacts from './organization-contacts';

export default class OrganizationPage extends React.Component {
    render() {
        return (
            <div>
                <OrganizationPageTitle/>

                <OrganizationSection/>

                <OrdersSummary/>
            </div>
        );
    }
}
