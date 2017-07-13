import React from 'react';
import PageTitle from '../page-title';
import OrganizationSection from "../page-sections/organization-section";
import OrdersTable from './orders-table'
import {connect} from 'react-redux';
import CustomPage from "../../../components/custom-components/custom-page";
import CustomTable from "../../../components/custom-components/custom-table";

class OrganizationPage extends React.Component {

    render() {
        return (
            <div>
                <PageTitle>{this.props.labels.title}</PageTitle>

                <OrganizationSection/>

                <CustomPage title={this.props.labels.ordersTable.title}>
                    <OrdersTable/>
                </CustomPage>

                <CustomPage title={this.props.labels.contactsTable.title}>
                    <CustomTable
                        headers={this.props.labels.contactsTable.tableHeaders}
                        data={this.props.selected.organization.contacts}
                    />
                </CustomPage>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        labels: state.softwareLabels.OrganizationPage,
        selected: state.selected,
    };
}

export default connect(mapStateToProps)(OrganizationPage);
