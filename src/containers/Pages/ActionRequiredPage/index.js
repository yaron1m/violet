import {connect} from 'react-redux';
import {selectOrder} from "../../../store/selected/actions";
import {getLabels} from "../../../store/labels/reducer";
import {getActionRequiredOrders} from "../../../store/orders/selectors";
import {redirect} from "../../../util/history-util";
import CustomPaperTable from "../../../components/tables/custom-paper-table";

function mapStateToProps(state) {
    return {
        title: getLabels(state).pages.actionRequiredPage.title,
        tableHeaders: getLabels(state).pages.actionRequiredPage.tableHeaders,
        elements: getActionRequiredOrders(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onEditButton: (orderId) => {
            dispatch(selectOrder(orderId));
            redirect('/form');
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomPaperTable);