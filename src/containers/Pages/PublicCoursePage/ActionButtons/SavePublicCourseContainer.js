import {connect} from 'react-redux';
import {
    sendSelectedPublicCourseToDatabase, updateSelectedPublicCourse,
} from "../../../../store/SelectedPublicCourse/Actions";
import {getLabels} from "../../../../store/labels/reducer";
import {isSelectedPublicCourse} from "../../../../store/SelectedPublicCourse/Selectors";
import {openDialog, openSnackbar} from "../../../../store/appearance/actions";
import {SaveActionButton} from "../../../../components/ActionButtons/SaveActionButton";
import {getNextPublicCourseId} from "../../../../store/PublicCourses/reducer";
import {getSelectedPublicCourse} from "../../../../store/SelectedPublicCourse/Selectors";
import {setIsSelectedOrder} from "../../../../store/SelectedOrder/Actions";

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
