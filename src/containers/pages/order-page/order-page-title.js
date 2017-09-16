import React from 'react';
import {connect} from 'react-redux';
import PageTitle from "../../../components/page-title";
import {getLabels} from "../../../store/labels/reducer";
import {getSelectedOrder, isSelectedOrder} from "../../../store/selected/reducer";
import {getSelectedOrderStatus} from "../../../util/order-status";

class OrderPageTitle extends React.Component {

    render() {
        let pageTitle = this.props.labels.title;

        if (this.props.isSelectedOrder) {
            pageTitle += this.props.labels.orderNumberTitle + this.props.selectedOrder.id;
        }

        else {
            pageTitle += this.props.labels.newOrderTitle;
        }

        const status = this.props.labels.orderStatusTitle + this.props.status;

        return (
            <div>
                <div>
                    <PageTitle title={pageTitle}/>
                </div>
                <div>
                    <PageTitle title={status}/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: getLabels(state).orderPage,
        selectedOrder: getSelectedOrder(state),
        isSelectedOrder: isSelectedOrder(state),
        status: getSelectedOrderStatus(state),
    };
}

export default connect(mapStateToProps)(OrderPageTitle);
