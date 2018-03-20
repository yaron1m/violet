import connect from "react-redux/es/connect/connect";
import {getLabels} from "../../../store/labels/reducer";
import {getSelectedOrder, getSelectedOrganization, isSelectedOrder} from "../../../store/selected/reducer";
import PrintOrderPage from "./PrintOrderPage";

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