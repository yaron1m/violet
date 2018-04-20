import {connect} from 'react-redux';
import {getLabels} from "../../../../../store/labels/reducer";
import LectureDetailsSection from "./LecturesDetailsSection";
import {getSelectedOrder} from "../../../../../store/selected/reducer";
import {isEmptyValue} from "../../../../../util/string-util";
import {updateSelectedOrder} from "../../../../../store/selected/actions";

const internalTabKey = "internalTab";
const publicCourseTabKey = "publicCourseTab";

function getSelectedTabKey(order){
    if(isEmptyValue(order, "lectureDetailsTabKey"))
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
        onTabClick: (key) => dispatch(updateSelectedOrder("lectureDetailsTabKey", key))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LectureDetailsSection);
