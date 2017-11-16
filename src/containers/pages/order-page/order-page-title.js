import React from 'react';
import {connect} from 'react-redux';
import {getLabels} from "../../../store/labels/reducer";
import {getSelectedOrder, isSelectedOrder} from "../../../store/selected/reducer";
import {getSelectedOrderStatus} from "../../../util/order-status";

class OrderPageTitle extends React.Component {

    render() {

        const pageTitle = this.props.isSelectedOrder ?
            this.props.labels.orderNumberTitle + this.props.selectedOrder.id
            : this.props.labels.newOrderTitle;


        const status = " - " + this.props.status;

        const style = {
            div: {
                fontSize: 24,
                marginBottom: 10,
                textAlign: "center",
            },
            title: {
                fontWeight: "bold",
            }
        };

        return (
            <div style={style.div}>
                <span style={style.title}>{pageTitle}</span>
                <span>{status}</span>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: getLabels(state).pages.orderPage.title,
        selectedOrder: getSelectedOrder(state),
        isSelectedOrder: isSelectedOrder(state),
        status: getSelectedOrderStatus(state),
    };
}

export default connect(mapStateToProps)(OrderPageTitle);
