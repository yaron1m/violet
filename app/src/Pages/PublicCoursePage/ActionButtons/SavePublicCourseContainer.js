import {connect} from 'react-redux';
import {
    sendSelectedPublicCourseToDatabase, updateSelectedPublicCourse,
} from "../../../Store/SelectedPublicCourse/Actions";
import {getLabels} from "../../../Store/Labels/Selectors";
import {isSelectedPublicCourse} from "../../../Store/SelectedPublicCourse/Selectors";
import {openDialog, openSnackbar} from "../../../Store/Appearance/Actions";
import SaveActionButton from "../../../Components/ActionButtons/SaveActionButton";
import {getNextPublicCourseId} from "../../../Store/PublicCourses/Selectors";
import {getSelectedPublicCourse} from "../../../Store/SelectedPublicCourse/Selectors";
import {setIsSelectedOrder} from "../../../Store/SelectedOrder/Actions";

async function savePublicCourse(selectedPublicCourse, actionButtonsLabels, nextPublicCourseId, dispatch) {

    await fillMissingFields(selectedPublicCourse, nextPublicCourseId, dispatch);

    function success() {
        const snackbarMessage = actionButtonsLabels.savedSuccessfully.replace("{0}", selectedPublicCourse.courseName);
        dispatch(openSnackbar(snackbarMessage));
        dispatch(setIsSelectedOrder());
    }

    function failure() {
        dispatch(openDialog(selectedPublicCourse.sendingToDatabaseFailedTitle, selectedPublicCourse.sendingToDatabaseFailedContent));
    }

    dispatch(sendSelectedPublicCourseToDatabase()).then(success, failure);

}

async function fillMissingFields(selectedPublicCourse, nextPublicCourseId, dispatch) {
    if (!selectedPublicCourse.hasOwnProperty("id")) {
        await dispatch(updateSelectedPublicCourse("id", nextPublicCourseId));
        await dispatch(updateSelectedPublicCourse("createdDate", new Date().toJSON()));
    }
}

function mapStateToProps(state) {
    return {
        actionButtonsLabels: getLabels(state).pages.publicCoursePage.actionButtons,
        isSelectedPublicCourse: isSelectedPublicCourse(state),
        selectedPublicCourse: getSelectedPublicCourse(state),
        nextPublicCourseId: getNextPublicCourseId(state),
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
            stateProps.nextPublicCourseId,
            dispatchProps.dispatch
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SaveActionButton);
