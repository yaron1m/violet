import {connect} from 'react-redux';
import {getOrderPageLabels} from "../../../../Store/Labels/Selectors";
import ClearFormButton from "./ClearForm";

function mapStateToProps(state) {
    return {
        tooltip: getOrderPageLabels(state).actionButtons.clear,
    };
}

export default connect(mapStateToProps)(ClearFormButton);
