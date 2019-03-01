import {connect} from "react-redux";
import {addNewLectureTime} from "../../../../../../Store/SelectedOrder/Actions";
import {CustomRaisedButton} from "../../../../../../Components/CustomComponents/CustomButtons";
import {IDispatch} from "../../../../../../Interfaces/ReduxInterfaces";

function mapDispatchToProps(dispatch: IDispatch) {
    return {
        label: "הוסף הרצאה חדשה",
        style: {
            marginBottom: 10
        },
        onClick: () => dispatch(addNewLectureTime())
    };
}

export default connect(undefined, mapDispatchToProps)(CustomRaisedButton);
