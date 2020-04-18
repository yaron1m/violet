import {connect} from "react-redux";
import {
    sendSelectedPublicCourseToDatabase,
    updateSelectedPublicCourse
} from "../../../Store/SelectedPublicCourse/Actions";
import {getSelectedPublicCourse, isSelectedPublicCourse} from "../../../Store/SelectedPublicCourse/Selectors";
import {openDialog, openSnackbar} from "../../../Store/Appearance/Actions";
import SaveActionButton from "../../../Components/ActionButtons/SaveActionButton";
import {getNextPublicCourseId} from "../../../Store/PublicCourses/Selectors";
import {setIsSelectedOrder} from "../../../Store/SelectedOrder/Actions";
import {IDispatch, IState} from "../../../Interfaces/ReduxInterfaces";
import {IPublicCourse} from "@violet/common";

async function savePublicCourse(
    selectedPublicCourse: IPublicCourse,
    nextPublicCourseId: number,
    dispatch: IDispatch
) {
    await fillMissingFields(selectedPublicCourse, nextPublicCourseId, dispatch);

    function success() {
        const snackbarMessage = "קורס ציבורי {0} נשמר בהצלחה".replace("{0}", selectedPublicCourse.courseName);
        dispatch(openSnackbar(snackbarMessage));
        dispatch(setIsSelectedOrder());
    }

    function failure() {
        dispatch(openDialog("שגיאה בשמירת קורס ציבורי", "חלה שגיאה בשמירת הקורס הציבורי בשרת"));
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
        isSelectedPublicCourse: isSelectedPublicCourse(state),
        selectedPublicCourse: getSelectedPublicCourse(state),
        nextPublicCourseId: getNextPublicCourseId(state),
    };
}

function mapDispatchToProps(dispatch: IDispatch) {
    return {
        dispatch,
    };
}

function mergeProps(stateProps: { isSelectedPublicCourse: boolean; selectedPublicCourse: IPublicCourse; nextPublicCourseId: number; },
                    dispatchProps: { dispatch: IDispatch }) {
    return {
        tooltip: "שמור קורס",
        onClick: () => savePublicCourse(
            stateProps.selectedPublicCourse,
            stateProps.nextPublicCourseId,
            dispatchProps.dispatch
        )
    };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SaveActionButton);
