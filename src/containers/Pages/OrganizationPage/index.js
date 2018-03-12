import React from 'react';
import OrganizationSection from "../order-page/sections/OrganizationSection/OrganizationSectionContainer";
import OrganizationActionButtons from './ActionButtons/OrganizationActionButtons';
import OrganizationsOrdersTable from './OrganizationsOrdersTable';

export default class OrganizationPage extends React.Component {
    render() {
        return (
            <div>
                <OrganizationActionButtons/>

                <OrganizationSection fullDetails={true}/>

                <OrganizationsOrdersTable/>
            </div>
        );
    }
}
