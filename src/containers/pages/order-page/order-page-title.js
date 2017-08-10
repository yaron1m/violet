import React from 'react';
import {connect} from 'react-redux';
import PageTitle from "../../../components/page-title";
import {getLabels} from "../../../store/labels/reducer";
import {getSelectedOrder, isSelectedOrder} from "../../../store/selected/reducer";

class OrderPageTitle extends React.Component {

    render() {
        const pageTitle = this.props.labels.title +
            (this.props.isSelectedOrder ? this.props.labels.orderNumberTitle + this.props.selectedOrder.id : this.props.labels.newOrderTitle);

        return (
            <PageTitle title={pageTitle} maxWidthm="50%"/>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: getLabels(state).orderPage,
        selectedOrder: getSelectedOrder(state),
        isSelectedOrder: isSelectedOrder(state),
    };
}

export default connect(mapStateToProps)(OrderPageTitle);
