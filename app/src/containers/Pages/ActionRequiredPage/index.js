import {connect} from 'react-redux';
import {selectOrder} from "../../../Store/SelectedOrder/Actions";
import {getLabels} from "../../../Store/Labels/Selectors";
import {getActionRequiredOrders} from "../../../Store/Orders/Selectors.ts";
import {redirect} from "../../../Util/HistoryUtil";
import CustomPaperTable from "../../../Components/Table/CustomPaperTable";

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
