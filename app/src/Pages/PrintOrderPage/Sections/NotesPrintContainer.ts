import {connect} from "react-redux";
import NotesPrintSection from "./NotesPrint";
import {IState} from "../../../Interfaces/ReduxInterfaces";
import {getSelectedOrder} from "../../../Store/SelectedOrder/Selectors";

function mapStateToProps(state: IState) {
    return {
        selectedOrder: getSelectedOrder(state),
    };
}

export default connect(mapStateToProps)(NotesPrintSection);