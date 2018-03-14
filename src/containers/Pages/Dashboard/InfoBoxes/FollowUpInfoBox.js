import {connect} from "react-redux";
import {getLabels} from "../../../../store/labels/reducer";
import {redirect} from "../../../../util/history-util";
import {getFollowUpOrdersSummary} from "../../../../store/orders/selectors";
import {isFetching} from "../../../../store/firebase/reducer";
import InfoBox from "./InfoBox";
import Colors from "../../../../util/consts/colors";
import NotificationsIcon from 'material-ui-icons/Notifications';

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