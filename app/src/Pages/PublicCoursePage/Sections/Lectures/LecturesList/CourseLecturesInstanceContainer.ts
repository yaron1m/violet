import {connect} from "react-redux";
import CourseLecturesInstance from "./CourseLecturesInstance";
import {getOfferedLectures} from "../../../../../Store/Lists/Selectors";
import {toSuggestions} from "../../../../../Components/AutoSuggest";
import {IDispatch, IState} from "../../../../../Interfaces/ReduxInterfaces";
import {getSelectedPublicCourseLecture} from "../../../../../Store/SelectedPublicCourse/Selectors";
import {updatePublicCourseLecture} from "../../../../../Store/SelectedPublicCourse/Actions";

function mapStateToProps(state: IState, ownProps: CourseLecturesInstanceContainerProps) {
    return {
        publicCourseLecture: getSelectedPublicCourseLecture(state, ownProps.lectureId),
        lectureId: ownProps.lectureId,
        offeredLectures: toSuggestions(getOfferedLectures(state)),
        requiredFields: [],
    };
}

function mapDispatchToProps(dispatch: IDispatch, ownProps: CourseLecturesInstanceContainerProps) {
    return {
        onChange: (key: string) => (newValue: string) => dispatch(updatePublicCourseLecture(key, newValue, ownProps.lectureId)),
        onChangeBoolean: (key: string) => (newValue: boolean) => dispatch(updatePublicCourseLecture(key, newValue, ownProps.lectureId)),
    };
}

interface CourseLecturesInstanceContainerProps {
    lectureId: number;
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseLecturesInstance);