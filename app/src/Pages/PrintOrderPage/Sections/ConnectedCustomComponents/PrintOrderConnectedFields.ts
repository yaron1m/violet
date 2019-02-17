import {connect} from "react-redux";
import {getSelectedOrder} from "../../../../Store/SelectedOrder/Selectors";
import {getOrderSectionsLabels} from "../../../../Store/Labels/Selectors";
import PrintField from "../../../../Components/CustomComponents/OrderPrint/PrintField";
import PrintDate from "../../../../Components/CustomComponents/OrderPrint/PrintDate";
import PrintBoolean from "../../../../Components/CustomComponents/OrderPrint/PrintBoolean";
import {IState} from "../../../../Interfaces/ReduxInterfaces";

function mapStateToProps(state: IState, ownProps: {values?: object}) {
    return {
        titles: getOrderSectionsLabels(state).titles,
        values: ownProps.values ? ownProps.values : getSelectedOrder(state),
        updateAction: function() {},
    };
}

export const PrintOrderConnectedText = connect(mapStateToProps)(PrintField);
export const PrintOrderConnectedDate = connect(mapStateToProps)(PrintDate);
export const PrintOrderConnectedBoolean = connect(mapStateToProps)(PrintBoolean);
