import React from 'react';
import OrganizationSection from "../page-sections/organization-section";
import {connect} from 'react-redux';
import CustomPage from "../../../components/custom-components/custom-page";
import CustomTable from "../../../components/custom-components/custom-table";
import { clearSelectedOrder, selectOrder} from "../../../store/selected/actions";
import {RaisedButton} from "material-ui";
import {getLabels} from "../../../store/labels/reducer";
import {getOrdersByOrganization} from "../../../store/orders/reducer";
import {getSelectedOrganization, isSelectedOrganization} from "../../../store/selected/reducer";
import OrganizationPageTitle from './organiation-page-title';

class OrganizationPage extends React.Component {
    render() {
        return (
            <div>
                <OrganizationPageTitle/>

                <OrganizationSection/>

                {/*/!*Orders summary*!/*/}
                <CustomPage
                    title={this.props.labels.ordersTable.title}
                    titleButton={
                        <RaisedButton primary={true} label={this.props.labels.ordersTable.newOrderButton}
                                      onClick={() => {
                                          this.props.dispatch(clearSelectedOrder());
                                          this.props.history.push('/form');
                                      }}
                        />}
                    titleButtonCondition={this.props.isSelectedOrganization}
                >
                    <CustomTable
                        headers={this.props.labels.ordersTable.tableHeaders}
                        data={this.props.OrderOfSelectedOrganization}
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
                        data={this.props.selectedOrganization.contacts}
                    />
                </CustomPage>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        labels: getLabels(state).OrganizationPage,
        selectedOrganization: getSelectedOrganization(state),
        isSelectedOrganization: isSelectedOrganization(state),
        OrderOfSelectedOrganization : getOrdersByOrganization(state),
    };
}

export default connect(mapStateToProps)(OrganizationPage);
