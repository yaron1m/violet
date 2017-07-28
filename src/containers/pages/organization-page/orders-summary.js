import React from 'react';
import {connect} from 'react-redux';
import CustomPage from "../../../components/custom-components/custom-page";
import CustomTable from "../../../components/custom-components/custom-table";
import {clearSelectedOrder, selectOrder} from "../../../store/selected/actions";
import RaisedButton from "material-ui/RaisedButton";
import {getLabels} from "../../../store/labels/reducer";
import {getOrdersByOrganization} from "../../../store/orders/reducer";
import {isSelectedOrganization} from "../../../store/selected/reducer";
import {withRouter} from "react-router";

class OrdersSummary extends React.Component {
    render() {
        return (
            <CustomPage
                title={this.props.labels.title}
                titleButton={
                    <RaisedButton primary={true} label={this.props.labels.newOrderButton}
                                  onClick={() => {
                                      this.props.dispatch(clearSelectedOrder());
                                      this.props.history.push('/form');
                                  }}
                    />}
                titleButtonCondition={this.props.isSelectedOrganization}
            >
                <CustomTable
                    headers={this.props.labels.tableHeaders}
                    data={this.props.OrderOfSelectedOrganization}
                    onEditButton={(order) => {
                        this.props.dispatch(selectOrder(order.id));
                        this.props.history.push('/form');
                    }}
                />
            </CustomPage>
        );
    }
}


function mapStateToProps(state) {
    return {
        labels: getLabels(state).OrganizationPage.ordersTable,
        isSelectedOrganization: isSelectedOrganization(state),
        OrderOfSelectedOrganization: getOrdersByOrganization(state),
    };
}

export default withRouter(connect(mapStateToProps)(OrdersSummary));
