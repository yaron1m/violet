import {connect} from 'react-redux';
import {getLabels} from "../../../../store/labels/reducer";
import ClearFormButton from "./ClearForm";

function mapStateToProps(state) {
    return {
        tooltip: getLabels(state).pages.orderPage.actionButtons.clear,
    };
}

export default connect(mapStateToProps)(ClearFormButton);
