import {connect} from 'react-redux';
import {getOrderPageLabels} from "../../../Store/Labels/Selectors";
import {getSelectedOrganization} from "../../../Store/SelectedOrganization/Selectors";
import * as _ from 'lodash';
import SendOfferButton from "./SendOffer";
import {getSelectedOrder, isSelectedOrder} from "../../../Store/SelectedOrder/Selectors";
import {IState} from '../../../Interfaces/ReduxInterfaces';
import IOrder from '../../../Interfaces/IOrder';

function getLink(selectedOrder: IOrder, selectedOrganizationName:string) {
    let topicsArray = _.map(selectedOrder.lectureTimes, lectureTime => lectureTime.topic);

    // Remove duplicates
    topicsArray = topicsArray.filter(function (elem, index, self) {
        return elem !== undefined && index === self.indexOf(elem);
    });

    let href = "violet:";

    href += parameter("id", selectedOrder.id.toString(), true);
    href += parameter("topic", arrayToParameterValue(topicsArray));
    href += parameter("email", selectedOrder.contactEmail);
    href += parameter("organizationName", selectedOrganizationName);
    href += parameter("contactFirstName", selectedOrder.contactFirstName);
    href += parameter("contactLastName", selectedOrder.contactLastName);
    href += parameter("contactPhone1", selectedOrder.contactPhone1);
    href += parameter("contactPhone2", selectedOrder.contactPhone2);
    href += parameter("orderCreationDate", new Date().toJSON());
    return href;
}

function parameter(key: string, value: string, first = false) {
    if (value === undefined || value === null)
        return "";

    const encodedValue = _.replace(value, "\"", "%22");
    return (first ? "" : "&") + key + "=" + encodedValue;
}

function arrayToParameterValue(array: string[]) {
    let res = "";
    for (const index in array) {
        res += array[index] + "#";
    }

    return res.substr(0, res.length - 1);
}

function mapStateToProps(state:IState) {
    return {
        sendLabel: getOrderPageLabels(state).actionButtons.send as string,
        orderEmailLink: isSelectedOrder(state) ?
            getLink(getSelectedOrder(state), getSelectedOrganization(state).organizationName)
            : undefined,
    };
}

export default connect(mapStateToProps)(SendOfferButton);
