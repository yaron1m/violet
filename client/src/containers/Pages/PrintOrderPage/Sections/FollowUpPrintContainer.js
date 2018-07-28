import connect from "react-redux/es/connect/connect";
import {getLabels} from "../../../../store/Labels/Reducer";
import {getSelectedOrder} from "../../../../store/SelectedOrder/Selectors";
import FollowUpPrintSection from "./FollowUpPrint";

function mapStateToProps(state) {
    return {
        sectionName: getLabels(state).pages.orderPage.sections.followUp.sectionName,
        display: getSelectedOrder(state).followUpRequired,
    };
}

export default connect(mapStateToProps)(FollowUpPrintSection);
