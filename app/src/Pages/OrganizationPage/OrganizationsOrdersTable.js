import {connect} from 'react-redux';
import {clearSelectedOrder} from "../../Store/SelectedOrder/Actions";
import {getLabels} from "../../Store/Labels/Selectors";
import {redirect} from "../../Util/HistoryUtil";
import CustomPaperTable from "../../Components/Table/CustomPaperTable";
import {getOrdersByOrganization, getOrdersSummary} from "../../Store/Orders/Selectors";
import {selectOrder} from "../../Store/SelectedOrder/Actions";
import {isSelectedOrganization} from "../../Store/SelectedOrganization/Selectors";
import {Path} from "../Path";

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
            redirect(Path.form);
        },
        singleCellRowOnClick: () => {
            dispatch(clearSelectedOrder());
            redirect(Path.form);
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomPaperTable);
