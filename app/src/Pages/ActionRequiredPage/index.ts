import {connect} from 'react-redux';
import {selectOrder} from "../../Store/SelectedOrder/Actions";
import {getLabels} from "../../Store/Labels/Selectors";
import {getActionRequiredOrders} from "../../Store/Orders/Selectors";
import {redirect} from "../../Util/HistoryUtil";
import CustomPaperTable from "../../Components/Table/CustomPaperTable";
import {IDispatch, IState} from '../../Interfaces/ReduxInterfaces';
import {Path} from '../Path';
import {IActionRequiredOrder} from '../../Store/Orders/ActionRequiredOrderes';

function mapStateToProps(state: IState) {
    return {
        title: getLabels(state).pages.actionRequiredPage.title,
        tableHeaders: getLabels(state).pages.actionRequiredPage.tableHeaders,
        elements: getActionRequiredOrders(state),
    };
}

function mapDispatchToProps(dispatch: IDispatch) {
    return {
        onEditButton: (orderSummary: IActionRequiredOrder) => {
            dispatch(selectOrder(orderSummary.orderId));
            redirect(Path.order);
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomPaperTable);
