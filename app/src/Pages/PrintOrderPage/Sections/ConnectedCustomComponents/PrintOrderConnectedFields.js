import {connect} from 'react-redux';
import {getSelectedOrder} from "../../../../Store/SelectedOrder/Selectors";
import {getOrderSectionsLabels} from "../../../../Store/Labels/Selectors";
import PrintField from "../../../../Components/CustomComponents/OrderPrint/PrintField";
import PrintDate from "../../../../Components/CustomComponents/OrderPrint/PrintDate";
import PrintBoolean from "../../../../Components/CustomComponents/OrderPrint/PrintBoolean";

function mapStateToProps(state, ownProps) {
    return {
        titles: getOrderSectionsLabels(state).titles,
        values: getSelectedOrder(state),
        updateAction: function(){},
        ...ownProps,
    };
}

export const PrintOrderConnectedText = connect(mapStateToProps)(PrintField);
export const PrintOrderConnectedDate = connect(mapStateToProps)(PrintDate);
export const PrintOrderConnectedBoolean = connect(mapStateToProps)(PrintBoolean);
