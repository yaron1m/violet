import React from 'react';
import PageTitle from '../page-title';
import OrganizationSection from "../page-sections/organization-section";
import OrdersTable from './orders-table'
import ContactsTable from "../order-page/contacts-table"
import {connect} from 'react-redux';
import CustomPage from "../../../components/custom-components/custom-page";

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
                    <ContactsTable/>
                </CustomPage>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        labels: state.softwareLabels.OrganizationPage,
    };
}

export default connect(mapStateToProps)(OrganizationPage);
