import connect from "react-redux/es/connect/connect";
import {getLabels} from "../../../../store/labels/reducer";
import {getSelectedOrder} from "../../../../store/selected/reducer";
import FollowUpPrintSection from "./FollowUpPrint";

function mapStateToProps(state) {
    return {
        sectionName: getLabels(state).pages.orderPage.sections.followUp.sectionName,
        display: getSelectedOrder(state).followUpRequired,
    };
}

export default connect(mapStateToProps)(FollowUpPrintSection);