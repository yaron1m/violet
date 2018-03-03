import {connect} from "react-redux";
import {getLabels} from "../../../../store/labels/reducer";
import {redirect} from "../../../../util/history-util";
import {getAllLectureTimes} from "../../../../store/orders/selectors";
import * as _ from 'lodash';
import {isFetching} from "../../../../store/firebase/reducer";
import Status from "../../../../util/consts/status";
import CheckBoxIcon from 'material-ui-icons/CheckCircle';
import InfoBox from "./InfoBox";
import Colors from "../../../../util/consts/colors";

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
        onClick: (orderId) => redirect('/futureLectures'),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoBox);