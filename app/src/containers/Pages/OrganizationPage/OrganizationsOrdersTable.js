import {connect} from 'react-redux';
import {clearSelectedOrder} from "../../../store/SelectedOrder/Actions";
import {getLabels} from "../../../store/Labels/Selectors";
import {redirect} from "../../../util/HistoryUtil";
import CustomPaperTable from "../../../components/tables/CustomPaperTable";
import {getOrdersByOrganization, getOrdersSummary} from "../../../store/orders/selectors";
import {selectOrder} from "../../../store/SelectedOrder/Actions";
import {isSelectedOrganization} from "../../../store/SelectedOrganization/Selectors";

function mapStateToProps(state) {
    return {
        title: getLabels(state).pages.organizationPage.ordersSummarySection.title,
        tableHeaders: getLabels(state).pages.organizationPage.ordersSummarySection.tableHeaders,
        elements: getOrdersSummary(state, getOrdersByOrganization).reverse(),

        singleCellRow: isSelectedOrganization(state),
        singleCellRowText: getLabels(state).pages.organizationPage.ordersSummarySection.addRow,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onEditButton: (orderId) => {
            dispatch(selectOrder(orderId));
            redirect('/form');
        },
        singleCellRowOnClick: () => {
            dispatch(clearSelectedOrder());
            redirect('/form');
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomPaperTable);
