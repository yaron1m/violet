import {connect} from 'react-redux';
import {getLabels} from "../../../../../store/Labels/Selectors";
import FollowUpSection from "./FollowUpSection";
import {getSelectedOrder} from "../../../../../store/SelectedOrder/Selectors";

function mapStateToProps(state) {
    return {
        sectionName: getLabels(state).pages.orderPage.sections.followUp.sectionName,
        followUpRequired: getSelectedOrder(state).followUpRequired,
    };
}

export default connect(mapStateToProps)(FollowUpSection);

