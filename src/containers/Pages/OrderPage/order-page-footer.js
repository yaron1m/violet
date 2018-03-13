import React from 'react';
import {connect} from 'react-redux';
import {getLabels} from "../../../store/labels/reducer";
import {getSelectedOrder, isSelectedOrder} from "../../../store/selected/reducer";

class OrderTimes extends React.Component {

    render() {
        if (!this.props.isSelectedOrder)
            return null;

        const style = {
            fontSize: 16,
            marginBottom: 10,
        };

        return (
            <div style={style}>
                {this.props.labels.createdDate +
                new Date(this.props.selectedOrder.createdDate).toLocaleDateString()
                + "  ;  " +
                this.props.labels.changedDate +
                new Date(this.props.selectedOrder.changedDate).toLocaleDateString()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: getLabels(state).pages.orderPage.footer,
        selectedOrder: getSelectedOrder(state),
        isSelectedOrder: isSelectedOrder(state),
    };
}

export default connect(mapStateToProps)(OrderTimes);
