import {connect} from 'react-redux';
import {getOrderSectionsLabels} from "../../../../Store/Labels/Selectors";
import FollowUpSection from "./FollowUpSection";
import {getSelectedOrder} from "../../../../Store/SelectedOrder/Selectors";

function mapStateToProps(state: IState) {
    return {
        sectionName: getOrderSectionsLabels(state).followUp.sectionName,
        followUpRequired: getSelectedOrder(state).followUpRequired,
    };
}

export default connect(mapStateToProps)(FollowUpSection);

