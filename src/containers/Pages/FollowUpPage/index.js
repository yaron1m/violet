import {connect} from 'react-redux';
import {selectOrder} from "../../../store/selected/actions";
import {getLabels} from "../../../store/labels/reducer";
import {redirect} from "../../../util/history-util";
import CustomPaperTable from "../../../components/tables/custom-paper-table";
import * as _ from "lodash";
import {getFollowUpOrdersSummary} from "../../../store/orders/selectors";

function mapStateToProps(state) {
    return {
        title: getLabels(state).pages.followUpPage.title,
        tableHeaders: getLabels(state).pages.followUpPage.tableHeaders,
        elements:  _.sortBy(getFollowUpOrdersSummary(state), x => x.followUpDate),
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
