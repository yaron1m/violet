import {connect} from 'react-redux';
import {sendSelectedPublicCourseToDatabase, setIsSelectedOrder,} from "../../../../store/selected/actions";
import {getLabels} from "../../../../store/labels/reducer";
import {getSelectedPublicCourse, isSelectedPublicCourse} from "../../../../store/selected/reducer";
import {openDialog, openSnackbar} from "../../../../store/appearance/actions";
import {SaveActionButton} from "../../../../components/ActionButtons/SaveActionButton";


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

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SaveActionButton);
