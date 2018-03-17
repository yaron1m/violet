import React from 'react';
import {connect} from 'react-redux';
import FlatButton from "material-ui/FlatButton";
import {
    sendSelectedOrderToDatabase, sendSelectedOrganizationToDatabase, sendSelectedPublicCourseToDatabase,
    setIsSelectedOrder, setIsSelectedOrganization,
    updateSelectedOrder, updateSelectedOrganization
} from "../../../../store/selected/actions";
import {getLabels} from "../../../../store/labels/reducer";
import {
    getSelectedOrder, getSelectedOrganization, getSelectedPublicCourse, isSelectedOrder,
    isSelectedOrganization, isSelectedPublicCourse
} from "../../../../store/selected/reducer";
import {getNextOrderId} from "../../../../store/orders/selectors";
import * as _ from "lodash";
import {closeDialog, openDialog, openSnackbar} from "../../../../store/appearance/actions";
import {getOrderMissingFields} from "../../../../store/required-fields/reducer";
import {hideRequiredFields, showRequiredFields} from "../../../../store/required-fields/actions";
import {getNextOrganizationId, getOrganizationById, getOrganizations} from "../../../../store/organizations/reducer";
import {isEmptyValue} from "../../../../util/string-util";
import {SaveOrderButton, SavePublicCourse} from "./SavePublicCourse";


function savePublicCourse(selectedPublicCourse, actionButtonsLabels, dispatch) {

    function success() {
        const snackbarMessage = actionButtonsLabels.savedSuccessfully.replace("{0}", selectedPublicCourse.courseName);
        dispatch(openSnackbar(snackbarMessage));
        dispatch(setIsSelectedOrder());
    }

    function failure(error) {
        dispatch(openDialog(selectedPublicCourse.sendingToDatabaseFailedTitle, selectedPublicCourse.sendingToDatabaseFailedContent));
        console.error(error);
    }

    dispatch(sendSelectedPublicCourseToDatabase()).then(success, failure);

}

function mapStateToProps(state) {
    return {
        actionButtonsLabels: getLabels(state).pages.publicCoursePage.actionButtons,
        isSelectedPublicCourse: isSelectedPublicCourse(state),
        selectedPublicCourse: getSelectedPublicCourse(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    }
}

function mergeProps(stateProps, dispatchProps) {
    return {
        tooltip: stateProps.actionButtonsLabels.save,
        onClick: () => savePublicCourse(
            stateProps.selectedPublicCourse,
            stateProps.actionButtonsLabels,
            dispatchProps.dispatch
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SavePublicCourse);
