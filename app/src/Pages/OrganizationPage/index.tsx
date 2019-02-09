import React from 'react';
import OrganizationSection from "../OrderPage/Sections/OrganizationSection/OrganizationSectionContainer";
import OrganizationActionButtons from './ActionButtons/OrganizationActionButtons';
import OrganizationsOrdersTable from './OrganizationsOrdersTable';

export default function OrganizationPage() {
    return (
        <div>
            <OrganizationActionButtons/>

            <OrganizationSection fullDetails={true}/>

            <OrganizationsOrdersTable/>
        </div>
    );
}
