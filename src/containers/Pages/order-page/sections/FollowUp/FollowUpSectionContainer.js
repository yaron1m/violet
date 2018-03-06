import {connect} from 'react-redux';
import {getLabels} from "../../../../../store/labels/reducer";
import FollowUpSection from "./FollowUpSection";
import {getSelectedOrder} from "../../../../../store/selected/reducer";

function mapStateToProps(state) {
    return {
        sectionName: getLabels(state).pages.orderPage.sections.followUp.sectionName,
        followUpRequired:getSelectedOrder(state).followUpRequired,
    };
}

export default connect(mapStateToProps)(FollowUpSection);

