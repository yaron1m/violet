import {connect} from 'react-redux';
import {clearSelectedOrder, selectOrder} from "../../../store/selected/actions";
import {getLabels} from "../../../store/labels/reducer";
import {redirect} from "../../../util/history-util";
import CustomPaperTable from "../../../components/tables/custom-paper-table";
import {getOrdersByOrganization, getOrdersSummary} from "../../../store/orders/selectors";
import {isSelectedOrganization} from "../../../store/selected/reducer";

function mapStateToProps(state) {
    return {
        title: getLabels(state).pages.organizationPage.ordersSummarySection.title,
        tableHeaders: getLabels(state).pages.organizationPage.ordersSummarySection.tableHeaders,
        elements: getOrdersSummary(state, getOrdersByOrganization).reverse(),

        singleCellRow:isSelectedOrganization(state),
        singleCellRowText: getLabels(state).pages.organizationPage.ordersSummarySection.addRow,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onEditButton: (orderId) => {
            dispatch(selectOrder(orderId));
            redirect('/form');
        },
        singleCellRowOnClick:() => {
            dispatch(clearSelectedOrder());
            redirect('/form');
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomPaperTable);
