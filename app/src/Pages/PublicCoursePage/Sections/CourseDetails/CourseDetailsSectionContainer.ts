import {connect} from "react-redux";
import CourseDetailsSection from "./CourseDetailsSection";
import {IDispatch, IState} from "../../../../Interfaces/ReduxInterfaces";
import {getSelectedPublicCourse} from "../../../../Store/SelectedPublicCourse/Selectors";
import {updateSelectedPublicCourse} from "../../../../Store/SelectedPublicCourse/Actions";

function mapStateToProps(state: IState) {
    return {
        selectedPublicCourse: getSelectedPublicCourse(state),
    };
}

function mapDispatchToProps(dispatch: IDispatch) {
    return {
        onChange: (key: string) => (value: string) => dispatch(updateSelectedPublicCourse(key, value)),
        onChangeBoolean: (key: string) => (value: boolean) => dispatch(updateSelectedPublicCourse(key, value)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseDetailsSection);
