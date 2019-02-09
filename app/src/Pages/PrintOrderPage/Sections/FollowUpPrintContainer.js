import connect from "react-redux/es/connect/connect";
import {getOrderSectionsLabels} from "../../../Store/Labels/Selectors";
import {getSelectedOrder} from "../../../Store/SelectedOrder/Selectors";
import FollowUpPrintSection from "./FollowUpPrint";

function mapStateToProps(state) {
    return {
        sectionName: getOrderSectionsLabels(state).followUp.sectionName,
        display: getSelectedOrder(state).followUpRequired,
    };
}

export default connect(mapStateToProps)(FollowUpPrintSection);
