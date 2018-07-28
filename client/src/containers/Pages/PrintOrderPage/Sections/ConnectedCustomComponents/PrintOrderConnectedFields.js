import {connect} from 'react-redux';
import {getSelectedOrder} from "../../../../../store/SelectedOrder/Selectors";
import {getLabels} from "../../../../../store/Labels/Reducer";
import PrintField from "../../../../../components/CustomComponents/OrderPrint/PrintField";
import PrintDate from "../../../../../components/CustomComponents/OrderPrint/PrintDate";
import PrintBoolean from "../../../../../components/CustomComponents/OrderPrint/PrintBoolean";

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
