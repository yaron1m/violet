import {connect} from 'react-redux';
import {getLabels} from "../../../../store/labels/reducer";
import {getSelectedOrder, getSelectedOrganization, isSelectedOrder} from "../../../../store/selected/reducer";
import * as _ from 'lodash'
import SendOfferButton from "./SendOffer";

function getLink(selectedOrder, selectedOrganizationName) {
    let topicsArray = _.map(selectedOrder.lectureTimes, lectureTime => lectureTime.topic);

    // Remove duplicates
    topicsArray = topicsArray.filter(function (elem, index, self) {
        return elem !== undefined && index === self.indexOf(elem);
    });

    let href = "violet:";

    href += parameter("id", selectedOrder.id, true);
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

function parameter(key, value, first = false) {
    if (value === undefined || value === null)
        return "";
    return (first ? "" : "&") + key + "=" + value;
}

function arrayToParameterValue(array) {
    let res = "";
    for (const index in array) {
        res += array[index] + "#";
    }

    return res.substr(0, res.length - 1);
}

function mapStateToProps(state) {
    return {
        sendLabel: getLabels(state).pages.orderPage.actionButtons.send,
        orderEmailLink: isSelectedOrder(state) ?
            getLink(getSelectedOrder(state), getSelectedOrganization(state).organizationName)
            : null,
    };
}

export default connect(mapStateToProps)(SendOfferButton);
