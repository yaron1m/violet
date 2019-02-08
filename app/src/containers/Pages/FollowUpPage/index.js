import {connect} from 'react-redux';
import {selectOrder} from "../../../store/SelectedOrder/Actions";
import {getLabels} from "../../../store/Labels/Selectors";
import {redirect} from "../../../util/HistoryUtil";
import CustomPaperTable from "../../../Components/Table/CustomPaperTable";
import * as _ from "lodash";
import {getFollowUpOrdersSummary} from "../../../store/orders/selectors";

function mapStateToProps(state) {
    return {
        title: getLabels(state).pages.followUpPage.title,
        tableHeaders: getLabels(state).pages.followUpPage.tableHeaders,
        elements: _.sortBy(getFollowUpOrdersSummary(state), x => x.followUpDate),
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
