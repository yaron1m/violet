import {connect} from "react-redux";
import {getSelectedPublicCourseLecture} from "../../../../../Store/SelectedPublicCourse/Selectors";
import GuestLecturerFields from "./GuestLecturerFields";
import {IDispatch, IState} from "../../../../../Interfaces/ReduxInterfaces";
import {updatePublicCourseLecture} from "../../../../../Store/SelectedPublicCourse/Actions";

function mapStateToProps(state: IState, ownProps: { lectureId: number }) {
    return {
        publicCourseLecture: getSelectedPublicCourseLecture(state, ownProps.lectureId),
        requiredFields: [],
    };
}

function mapDispatchToProps(dispatch: IDispatch, ownProps: { lectureId: number }) {
    return {
        onChange: (key: string) => (newValue: string) => dispatch(updatePublicCourseLecture(key, newValue, ownProps.lectureId)),
        onChangeBoolean: (key: string) => (newValue: boolean) => dispatch(updatePublicCourseLecture(key, newValue, ownProps.lectureId)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GuestLecturerFields);