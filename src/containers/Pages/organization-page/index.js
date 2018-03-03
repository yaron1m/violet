import React from 'react';
import OrganizationSection from "../order-page/sections/organization-section";
import OrganizationPageTitle from './organiation-page-title';
import OrganizationActionButtons from './ActionButtons/OrganizationActionButtons';
import OrganizationsOrdersTable from './OrganizationsOrdersTable';

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
