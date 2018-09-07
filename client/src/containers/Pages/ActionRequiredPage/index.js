import {connect} from 'react-redux';
import {selectOrder} from "../../../store/SelectedOrder/Actions";
import {getLabels} from "../../../store/Labels/Selectors";
import {getActionRequiredOrders} from "../../../store/orders/selectors";
import {redirect} from "../../../util/HistoryUtil";
import CustomPaperTable from "../../../components/tables/CustomPaperTable";

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
