import {connect} from 'react-redux';
import {selectOrder} from "../../Store/SelectedOrder/Actions";
import {getLabels} from "../../Store/Labels/Selectors";
import {redirect} from "../../Util/HistoryUtil";
import CustomPaperTable from "../../Components/Table/CustomPaperTable";
import * as _ from "lodash";
import {getFollowUpOrdersSummary, IFollowUpOrderSummary} from "../../Store/Orders/Selectors";
import {Path} from "../Path";
import {IDispatch, IState} from '../../Interfaces/ReduxInterfaces';

function mapStateToProps(state: IState) {
    return {
        title: getLabels(state).pages.followUpPage.title,
        tableHeaders: getLabels(state).pages.followUpPage.tableHeaders,
        elements: _.sortBy(getFollowUpOrdersSummary(state), x => x.followUpDate),
    };
}

function mapDispatchToProps(dispatch: IDispatch) {
    return {
        onEditButton: (summary: IFollowUpOrderSummary) => {
            dispatch(selectOrder(summary.orderId));
            redirect(Path.form);
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomPaperTable);