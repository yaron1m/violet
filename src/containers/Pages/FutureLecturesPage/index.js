import {connect} from 'react-redux';
import {selectOrder} from "../../../store/SelectedOrder/Actions";
import {getLabels} from "../../../store/labels/reducer";
import {redirect} from "../../../util/history-util";
import CustomPaperTable from "../../../components/tables/CustomPaperTable";
import * as _ from "lodash";
import {getAllLectureTimes} from "../../../store/orders/selectors";
import Status from "../../../util/consts/status";

export function getFutureLectureTimes(state){
    const lectureTimes = getAllLectureTimes(state, [Status.approvedOrder, Status.isExecuting]);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);
    return _.sortBy(
        _.filter(lectureTimes, lectureTime => new Date(lectureTime.date) > yesterday),
        x => x.date);
}

function mapStateToProps(state) {
    return {
        title: getLabels(state).pages.futureLecturesPage.table.title,
        tableHeaders: getLabels(state).pages.futureLecturesPage.table.tableHeaders,
        elements: getFutureLectureTimes(state),
        rowIndexKey: "orderId"
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
