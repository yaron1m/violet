import {connect} from "react-redux";
import {getLabels} from "../../../../store/Labels/Reducer";
import {redirect} from "../../../../util/HistoryUtil";
import {getAllLectureTimes} from "../../../../store/orders/selectors";
import * as _ from 'lodash';
import {isFetching} from "../../../../store/Firebase/Reducer";
import Status from "../../../../util/Constants/Status";
import CheckBoxIcon from '@material-ui/icons/CheckCircle';
import InfoBox from "./InfoBox";
import Colors from "../../../../util/Constants/Colors";

function calculateFutureLectures(state) {
    if (isFetching(state))
        return;

    const now = new Date();
    const lectureTimes = getAllLectureTimes(state, [Status.approvedOrder, Status.isExecuting]);
    const futureLectureTimes = _.filter(lectureTimes, lectureTime => new Date(lectureTime.date) > now);
    return futureLectureTimes.length.toString();
}


function mapStateToProps(state) {
    return {
        Icon: CheckBoxIcon,
        color: Colors.infoBoxes.orange,
        title: getLabels(state).pages.dashboard.infoBoxes.futureLectures,
        value: calculateFutureLectures(state),
    };
}

function mapDispatchToProps() {
    return {
        onClick: () => redirect('/futureLectures'),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoBox);