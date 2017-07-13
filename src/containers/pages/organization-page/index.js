import React from 'react';
import PageTitle from '../page-title';
import OrganizationSection from "../page-sections/organization-section";
import {connect} from 'react-redux';
import CustomPage from "../../../components/custom-components/custom-page";
import CustomTable from "../../../components/custom-components/custom-table";
import {selectOrder} from "../../../actions/action-orders";

class OrganizationPage extends React.Component {

    render() {
        return (
            <div>
                <PageTitle>{this.props.labels.title}</PageTitle>

                <OrganizationSection/>

                {/*Orders summary*/}
                <CustomPage title={this.props.labels.ordersTable.title}>
                    <CustomTable
                        headers={this.props.labels.ordersTable.tableHeaders}
                        data={
                            Object.values(this.props.orders)
                                .filter((order) => order.id === this.props.selected.organization.id)
                        }
                        onEditButton={(order) => {
                            this.props.dispatch(selectOrder(order));
                            this.props.history.push('/form');
                        }}
                    />
                </CustomPage>

                {/*Contacts*/}
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
        orders: state.orders,
    };
}

export default connect(mapStateToProps)(OrganizationPage);
