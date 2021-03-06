import {connect} from "react-redux";
import FollowUpSection from "./FollowUpSection";
import {getSelectedOrder} from "../../../../Store/SelectedOrder/Selectors";
import {IState} from "../../../../Interfaces/ReduxInterfaces";

function mapStateToProps(state: IState) {
    return {
        followUpRequired: getSelectedOrder(state).followUpRequired,
    };
}

export default connect(mapStateToProps)(FollowUpSection);
