import connect from "react-redux/es/connect/connect";
import {getLabels} from "../../../store/Labels/Reducer";
import {getSelectedOrganization} from "../../../store/SelectedOrganization/Selectors";
import PrintOrderPage from "./PrintOrderPage";
import {getSelectedOrder, isSelectedOrder} from "../../../store/SelectedOrder/Selectors";

function getTitle(isSelectedOrder, labels, selectedOrder, selectedOrganization) {
    if (!isSelectedOrder)
        return labels.printNoOrderSelected;

    return labels.printOrderNumberLabel + selectedOrder.id + ": " + selectedOrganization.organizationName;
}

function mapStateToProps(state) {
    return {
        isSelectedOrder: isSelectedOrder(state),
        title: getTitle(
            isSelectedOrder(state),
            getLabels(state).pages.printPage,
            getSelectedOrder(state),
            getSelectedOrganization(state),
        ),

        onLoad: function(){
            if (isSelectedOrder(state))
                window.print();
        },
    };
}

export default connect(mapStateToProps)(PrintOrderPage);