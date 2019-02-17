import {connect} from "react-redux";
import {getOrderPageLabels} from "../../../Store/Labels/Selectors";
import ClearFormButton from "./ClearForm";
import {IState} from "../../../Interfaces/ReduxInterfaces";

function mapStateToProps(state: IState) {
    return {
        tooltip: getOrderPageLabels(state).actionButtons.clear,
    };
}

export default connect(mapStateToProps)(ClearFormButton);
