import React from 'react';
import {connect} from 'react-redux';
import {getLabels} from "../../../store/labels/reducer";
import {getSelectedOrder, isSelectedOrder} from "../../../store/selected/reducer";

class OrderPageFooter extends React.Component {

    render() {
        if (!this.props.isSelectedOrder)
            return null;

        const style = {
            fontSize: 12,
            marginRight: 5,
        };

        return (
            <div style={style}>
                {this.props.labels.footer.createdDate +
                new Date(this.props.selectedOrder.createdDate).toLocaleDateString()
                + "  ;  " +
                this.props.labels.footer.changedDate +
                new Date(this.props.selectedOrder.changedDate).toLocaleDateString()}
            </div>
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

export default connect(mapStateToProps)(OrderPageFooter);
