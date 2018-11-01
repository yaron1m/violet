import {connect} from 'react-redux';
import {getOrderSectionsLabels} from "../../../../../store/Labels/Selectors";
import FollowUpSection from "./FollowUpSection";
import {getSelectedOrder} from "../../../../../store/SelectedOrder/Selectors";

function mapStateToProps(state) {
    return {
        sectionName: getOrderSectionsLabels(state).followUp.sectionName,
        followUpRequired: getSelectedOrder(state).followUpRequired,
    };
}

export default connect(mapStateToProps)(FollowUpSection);

