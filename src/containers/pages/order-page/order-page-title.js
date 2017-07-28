import React from 'react';
import {connect} from 'react-redux';
import PageTitle from "../../../components/page-title";
import IconButton from "material-ui/IconButton";
import ClearIcon from 'material-ui/svg-icons/content/clear';
import PrintIcon from 'material-ui/svg-icons/action/print';
import {clearSelectedOrder} from "../../../store/selected/actions";
import OrderSaveButton from './order-save-button'
import {getLabels} from "../../../store/labels/reducer";
import {getSelectedOrder, isSelectedOrder} from "../../../store/selected/reducer";

class OrderPageTitle extends React.Component {

    render() {
        const pageTitle = this.props.labels.title +
            (this.props.isSelectedOrder ? this.props.labels.orderNumberTitle + this.props.selectedOrder.id : this.props.labels.newOrderTitle);

        return (
            <PageTitle title={pageTitle}>

                <OrderSaveButton/>

                <IconButton><PrintIcon/></IconButton>

                <IconButton><ClearIcon
                    onClick={() => this.props.dispatch(clearSelectedOrder()).bind(this)}
                /></IconButton>
            </PageTitle>
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
