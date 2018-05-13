import {connect} from 'react-redux';
import {getSelectedOrder} from "../../../../../store/selected/reducer";
import {getLabels} from "../../../../../store/labels/reducer";
import PrintField from "../../../../../components/custom-components/order-print/print-field";
import PrintDate from "../../../../../components/custom-components/order-print/print-date";
import PrintBoolean from "../../../../../components/custom-components/order-print/print-boolean";

function mapStateToProps(state, ownProps) {
    return {
        titles: getLabels(state).pages.orderPage.sections.titles,
        values: getSelectedOrder(state),
        updateAction: function(){},
        ...ownProps,
    };
}

export const PrintOrderConnectedText = connect(mapStateToProps)(PrintField);
export const PrintOrderConnectedDate = connect(mapStateToProps)(PrintDate);
export const PrintOrderConnectedBoolean = connect(mapStateToProps)(PrintBoolean);