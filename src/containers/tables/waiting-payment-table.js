import React from 'react';
import {connect} from 'react-redux';
import {selectOrder} from "../../store/selected/actions";
import {getLabels} from "../../store/labels/reducer";
import {getExpectedIncomeOrders} from "../../store/orders/selectors";
import {redirect} from "../../util/history-util";
import CustomPaperTable from "../../components/tables/custom-paper-table";
import {progressiveStatuses as Status} from "../../util/consts/status";

class WaitingPaymentTable extends React.Component {
    selectOrder(orderId) {
        this.props.dispatch(selectOrder(orderId));
        redirect('/form');
    }

    render() {

        return (
            <CustomPaperTable
                title={this.props.labels.title}
                tableHeaders={this.props.labels.tableHeaders}
                elements={this.props.waitingPaymentOrders}
                rowIndexKey="id"
                onEditButton={this.selectOrder.bind(this)}
                hideEdit={this.props.hideEdit}
                limit={this.props.limit}
            />
        );
    }
}


function mapStateToProps(state) {
    return {
        labels: getLabels(state).pages.paymentPage.table,
        waitingPaymentOrders: getExpectedIncomeOrders(state, Status.waitingPayment),
    };
}

export default connect(mapStateToProps)(WaitingPaymentTable);
