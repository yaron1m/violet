import {connect} from "react-redux";
import {getLabels} from "../../../../Store/Labels/Selectors";
import {redirect} from "../../../../Util/HistoryUtil";
import {getFollowUpOrdersSummary} from "../../../../Store/Orders/Selectors.ts";
import {isFetching} from "../../../../Store/Firebase/Selectors";
import InfoBox from "./InfoBox";
import Colors from "../../../../Util/Constants/Colors";
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