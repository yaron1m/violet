import {connect} from "react-redux";
import {getLabels} from "../../../Store/Labels/Selectors";
import {redirect} from "../../../Util/HistoryUtil";
import {isFetching} from "../../../Store/Firebase/Selectors";
import CheckBoxIcon from "@material-ui/icons/CheckCircle";
import InfoBox from "./InfoBox";
import Colors from "../../../Util/Constants/Colors";
import {getFutureLectureTimes} from "../../FutureLecturesPage";
import {IState} from "../../../Interfaces/ReduxInterfaces";
import {Path} from "../../Path";

function mapStateToProps(state: IState) {
    return {
        Icon: CheckBoxIcon,
        color: Colors.infoBoxes.orange,
        title: getLabels(state).pages.dashboard.infoBoxes.futureLectures,
        value: isFetching(state) ? undefined : getFutureLectureTimes(state).length.toString(),
    };
}

function mapDispatchToProps() {
    return {
        onClick: () => redirect(Path.futureLectures),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoBox);