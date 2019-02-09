import {connect} from "react-redux";
import {getLabels} from "../../Store/Labels/Selectors";
import {getSelectedOrganization} from "../../Store/SelectedOrganization/Selectors";
import PrintOrderPage from "./PrintOrderPage";
import {getSelectedOrder, isSelectedOrder} from "../../Store/SelectedOrder/Selectors";
import {IState} from '../../Interfaces/ReduxInterfaces';
import IOrder from '../../Interfaces/IOrder';
import IOrganization from '../../Interfaces/IOrganization';

function getTitle(isSelectedOrder: boolean, labels: any, selectedOrder: IOrder, selectedOrganization: IOrganization): string {
    if (!isSelectedOrder)
        return labels.printNoOrderSelected;

    return labels.printOrderNumberLabel + selectedOrder.id + ": " + selectedOrganization.organizationName;
}

function mapStateToProps(state: IState) {
    return {
        isSelectedOrder: isSelectedOrder(state),
        title: getTitle(
            isSelectedOrder(state),
            getLabels(state).pages.printPage,
            getSelectedOrder(state),
            getSelectedOrganization(state),
        ),

        onLoad: function () {
            if (isSelectedOrder(state))
                window.print();
        },
    };
}

export default connect(mapStateToProps)(PrintOrderPage);