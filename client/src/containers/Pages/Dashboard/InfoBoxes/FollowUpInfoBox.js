import {connect} from "react-redux";
import {getLabels} from "../../../../store/Labels/Reducer";
import {redirect} from "../../../../util/HistoryUtil";
import {getFollowUpOrdersSummary} from "../../../../store/orders/selectors";
import {isFetching} from "../../../../store/Firebase/Reducer";
import InfoBox from "./InfoBox";
import Colors from "../../../../util/Constants/Colors";
import NotificationsIcon from '@material-ui/icons/Notifications';

function calculateFollowUpSummary(state) {
    if (isFetching(state))
        return;

    return getFollowUpOrdersSummary(state).length.toString();
}

function mapStateToProps(state) {
    return {
        Icon: NotificationsIcon,
        color: Colors.infoBoxes.pink,
        title: getLabels(state).pages.dashboard.infoBoxes.followUp,
        value: calculateFollowUpSummary(state),
    };
}

function mapDispatchToProps() {
    return {
        onClick: () => redirect('/followup'),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoBox);