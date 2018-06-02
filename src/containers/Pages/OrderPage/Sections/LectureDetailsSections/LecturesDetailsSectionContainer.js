import {connect} from 'react-redux';
import {getLabels} from "../../../../../store/Labels/Reducer";
import LectureDetailsSection from "./LecturesDetailsSection";
import {getSelectedOrder} from "../../../../../store/SelectedOrder/Selectors";
import {isEmptyValue} from "../../../../../util/StringUtil";
import {updateSelectedOrder} from "../../../../../store/SelectedOrder/Actions";

export const internalTabKey = "internalTab";
export const publicCourseTabKey = "publicCourseTab";

function getSelectedTabKey(order){
    if (isEmptyValue(order, "lectureDetailsTabKey"))
        return internalTabKey;

    return order.lectureDetailsTabKey;
}

function mapStateToProps(state) {
    return {
        selectedTabKey: getSelectedTabKey(getSelectedOrder(state)),
        internalLabel: getLabels(state).pages.orderPage.sections.lectureDetails.tabs.internalLabel,
        publicCourseLabel: getLabels(state).pages.orderPage.sections.lectureDetails.tabs.publicCourseLabel,
        internalTabKey,
        publicCourseTabKey,
    };
}

function mapDispatchToProps(dispatch){
    return {
        onTabClick: (event, value) => dispatch(updateSelectedOrder("lectureDetailsTabKey", value))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LectureDetailsSection);
