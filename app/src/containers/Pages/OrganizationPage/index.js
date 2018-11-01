import React from 'react';
import OrganizationSection from "../OrderPage/Sections/OrganizationSection/OrganizationSectionContainer";
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
