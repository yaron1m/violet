import {connect} from "react-redux";
import {getLabels} from "../../../Store/Labels/Selectors";
import {redirect} from "../../../Util/HistoryUtil";
import {getFollowUpOrdersSummary} from "../../Store/Orders/Selectors";
import {isFetching} from "../../../Store/Firebase/Selectors";
import InfoBox from "./InfoBox";
import Colors from "../../../Util/Constants/Colors";
import NotificationsIcon from '@material-ui/icons/Notifications';
import {Path} from '../../Path';
import {IState} from '../../../Interfaces/ReduxInterfaces';

function mapStateToProps(state:IState) {
    return {
        Icon: NotificationsIcon,
        color: Colors.infoBoxes.pink,
        title: getLabels(state).pages.dashboard.infoBoxes.followUp,
        value: isFetching(state) ? undefined : getFollowUpOrdersSummary(state).length.toString(),
    };
}

function mapDispatchToProps() {
    return {
        onClick: () => redirect(Path.followUp),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoBox);