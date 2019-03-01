import {connect} from "react-redux";
import {addLectureToSelectedPublicCourse} from "../../../../../Store/SelectedPublicCourse/Actions";
import {CustomRaisedButton} from "../../../../../Components/CustomComponents/CustomButtons";
import {IDispatch} from "../../../../../Interfaces/ReduxInterfaces";

function mapDispatchToProps(dispatch: IDispatch) {
    return {
        onClick: () => dispatch(addLectureToSelectedPublicCourse()),
        label: "הוסף הרצאה",
        style: {
            marginTop: 10
        }
    };
}

export default connect(undefined, mapDispatchToProps)(CustomRaisedButton);
