import {connect} from "react-redux";
import {getLabels} from "../../../../Store/Labels/Selectors";
import {redirect} from "../../../../Util/HistoryUtil";
import {isFetching} from "../../../../Store/Firebase/Selectors";
import CheckBoxIcon from '@material-ui/icons/CheckCircle';
import InfoBox from "./InfoBox";
import Colors from "../../../../Util/Constants/Colors";
import {getFutureLectureTimes} from "../../FutureLecturesPage";

function calculateFutureLectures(state) {
    if (isFetching(state))
        return;

    const lectureTimes = getFutureLectureTimes(state);
    return lectureTimes.length.toString();
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