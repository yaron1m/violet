import React from 'react';
import OrganizationSectionContainer from "../OrderPage/Sections/OrganizationSection/OrganizationSectionContainer";
import OrganizationActionButtons from './ActionButtons/OrganizationActionButtons';
import OrganizationsOrdersTable from './OrganizationsOrdersTable';

export default function OrganizationPage() {
    return (
        <div>
            <OrganizationActionButtons/>

            <OrganizationSectionContainer fullDetails={true}/>

            <OrganizationsOrdersTable/>
        </div>
    );
}
