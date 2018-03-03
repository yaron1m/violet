import React from 'react';
import OrganizationSection from "./organization-section";
import OrganizationPageTitle from './organiation-page-title';
import OrganizationActionButtons from './organiation-action-buttons';
import OrganizationsOrdersTable from '../../tables/organizations-orders-table';

export default class OrganizationPage extends React.Component {
    render() {
        return (
            <div>
                <OrganizationPageTitle/>
                <OrganizationActionButtons/>

                <OrganizationSection fullDetails={true}/>

                <OrganizationsOrdersTable/>
            </div>
        );
    }
}
