import {connect} from 'react-redux';
import {getLabels} from "../../../store/labels/reducer";
import {getSelectedOrder, isSelectedOrder} from "../../../store/selected/reducer";
import {getSelectedOrderStatus} from "../../../util/order-status";
import PublicCoursePageTitle from "./PublicCoursePageTitle";

function getPageTitle(state){
    // return isSelectedOrder(state) ?
    //     getLabels(state).pages.publicCoursePage.title + getSelectedOrder(state).id
    //     : getLabels(state).pages.orderPage.title.newOrderTitle;
    //
    return getLabels(state).pages.publicCoursePage.title;
}

function mapStateToProps(state) {
    return {
        title:getPageTitle(state),
        //status: getSelectedOrderStatus(state),
    };
}

export default connect(mapStateToProps)(PublicCoursePageTitle);
