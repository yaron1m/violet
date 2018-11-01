import {connect} from 'react-redux';
import {getLabels} from "../../../../../store/Labels/Selectors";
import LectureDetailsSection from "./LecturesDetailsSection";
import {getSelectedOrder} from "../../../../../store/SelectedOrder/Selectors";
import {isEmptyValue} from "../../../../../util/StringUtil";
import {updateSelectedOrder} from "../../../../../store/SelectedOrder/Actions";
import {internalTabKey, publicCourseTabKey} from "../../../../../util/Constants/TabKeys";


function getSelectedTabKey(order){
    if (isEmptyValue(order, "lectureDetailsTabKey"))
        return internalTabKey;

    return order.lectureDetailsTabKey;
}

function mapStateToProps(state) {
    return {
        selectedTabKey: getSelectedTabKey(getSelectedOrder(state)),
        internalLabel: getLabels(state).orderTypes.internalCourse,
        publicCourseLabel: getLabels(state).orderTypes.publicCourse,
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
