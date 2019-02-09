import {connect} from "react-redux";
import {getOrderSectionsLabels} from "../../../Store/Labels/Selectors";
import {getSelectedOrder} from "../../../Store/SelectedOrder/Selectors";
import FollowUpPrintSection from "./FollowUpPrint";
import {IState} from "../../../Interfaces/ReduxInterfaces";

function mapStateToProps(state: IState) {
    return {
        sectionName: getOrderSectionsLabels(state).followUp.sectionName,
        display: getSelectedOrder(state).followUpRequired,
    };
}

export default connect(mapStateToProps)(FollowUpPrintSection);
