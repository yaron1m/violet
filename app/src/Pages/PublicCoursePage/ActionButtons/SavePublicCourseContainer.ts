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
import {IDispatch, IState} from '../../../Interfaces/ReduxInterfaces';
import IPublicCourse from '../../../Interfaces/IPublicCourse';

async function savePublicCourse(
    selectedPublicCourse: IPublicCourse,
    actionButtonsLabels: any,
    nextPublicCourseId: number,
    dialogText: any,
    dispatch: IDispatch
) {
    await fillMissingFields(selectedPublicCourse, nextPublicCourseId, dispatch);

    function success() {
        const snackbarMessage = actionButtonsLabels.savedSuccessfully.replace("{0}", selectedPublicCourse.courseName);
        dispatch(openSnackbar(snackbarMessage));
        dispatch(setIsSelectedOrder());
    }

    function failure() {
        dispatch(openDialog(dialogText.sendingToDatabaseFailedTitle, dialogText.sendingToDatabaseFailedContent));
    }

    dispatch(sendSelectedPublicCourseToDatabase()).then(success, failure);
}

async function fillMissingFields(selectedPublicCourse: IPublicCourse, nextPublicCourseId: number, dispatch: IDispatch) {
    if (!selectedPublicCourse.hasOwnProperty("id")) {
        await dispatch(updateSelectedPublicCourse("id", nextPublicCourseId.toString()));
        await dispatch(updateSelectedPublicCourse("createdDate", new Date().toJSON()));
    }
}

function mapStateToProps(state: IState) {
    return {
        actionButtonsLabels: getLabels(state).pages.publicCoursePage.actionButtons,
        isSelectedPublicCourse: isSelectedPublicCourse(state),
        selectedPublicCourse: getSelectedPublicCourse(state),
        nextPublicCourseId: getNextPublicCourseId(state),
        dialogText: getLabels(state).pages.publicCoursePage.actionButtons,
    };
}

function mapDispatchToProps(dispatch: IDispatch) {
    return {
        dispatch,
    };
}

function mergeProps(stateProps: {
    actionButtonsLabels: any; isSelectedPublicCourse: boolean; selectedPublicCourse: IPublicCourse; nextPublicCourseId: number; dialogText: any;
}, dispatchProps: { dispatch: IDispatch }) {
    return {
        tooltip: stateProps.actionButtonsLabels.save,
        onClick: () => savePublicCourse(
            stateProps.selectedPublicCourse,
            stateProps.actionButtonsLabels,
            stateProps.nextPublicCourseId,
            stateProps.dialogText,
            dispatchProps.dispatch
        )
    };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SaveActionButton);
