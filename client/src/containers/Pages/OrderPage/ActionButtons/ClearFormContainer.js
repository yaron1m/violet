import {connect} from 'react-redux';
import {getLabels} from "../../../../store/Labels/Selectors";
import ClearFormButton from "./ClearForm";

function mapStateToProps(state) {
    return {
        tooltip: getLabels(state).pages.orderPage.actionButtons.clear,
    };
}

export default connect(mapStateToProps)(ClearFormButton);
