import {connect} from 'react-redux';
import {clearSelectedOrder} from "../../Store/SelectedOrder/Actions";
import {getLabels} from "../../Store/Labels/Selectors";
import {redirect} from "../../Util/HistoryUtil";
import CustomPaperTable from "../../Components/Table/CustomPaperTable";
import {getOrdersByOrganization, getOrdersSummary, IOrderSummary} from "../../Store/Orders/Selectors";
import {selectOrder} from "../../Store/SelectedOrder/Actions";
import {isSelectedOrganization} from "../../Store/SelectedOrganization/Selectors";
import {Path} from "../Path";
import {IDispatch, IState} from '../../Interfaces/ReduxInterfaces';

function mapStateToProps(state:IState) {
    return {
        title: getLabels(state).pages.organizationPage.ordersSummarySection.title,
        tableHeaders: getLabels(state).pages.organizationPage.ordersSummarySection.tableHeaders,
        elements: getOrdersSummary(state, getOrdersByOrganization).reverse(),

        singleCellRow: isSelectedOrganization(state),
        singleCellRowText: getLabels(state).pages.organizationPage.ordersSummarySection.addRow,
    };
}

function mapDispatchToProps(dispatch:IDispatch) {
    return {
        onEditButton: (summary: IOrderSummary) => {
            dispatch(selectOrder(summary.orderId));
            redirect(Path.form);
        },
        singleCellRowOnClick: () => {
            dispatch(clearSelectedOrder());
            redirect(Path.form);
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomPaperTable);
