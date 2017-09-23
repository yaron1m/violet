import React from 'react';
import {connect} from 'react-redux';
import IconButton from "material-ui/IconButton";
import SendIcon from 'material-ui-icons/Mail';
import {getLabels} from "../../../../store/labels/reducer";
import {
    getSelectedOrder, getSelectedOrganization, isSelectedOrder
} from "../../../../store/selected/reducer";
import * as _ from 'lodash'

class SendOfferButton extends React.Component {

    orderEmailHref() {
        let topicsArray = _.map(this.props.selectedOrder.lectureTimes, lectureTime => lectureTime.topic);

        // Remove duplicates
        topicsArray = topicsArray.filter(function (elem, index, self) {
            return elem !== undefined && index === self.indexOf(elem);
        });

        let href = "violet:";
        href += SendOfferButton.parameter("id", this.props.selectedOrder.id, true);
        href += SendOfferButton.parameter("topic", SendOfferButton.arrayToParameterValue(topicsArray));
        href += SendOfferButton.parameter("email", this.props.selectedOrder.contactEmail);
        href += SendOfferButton.parameter("organizationName", this.props.selectedOrganization.organizationName);
        href += SendOfferButton.parameter("contactFirstName", this.props.selectedOrder.contactFirstName);
        href += SendOfferButton.parameter("contactLastName", this.props.selectedOrder.contactLastName);
        href += SendOfferButton.parameter("contactPhone1", this.props.selectedOrder.contactPhone1);
        href += SendOfferButton.parameter("contactPhone2", this.props.selectedOrder.contactPhone2);
        href += SendOfferButton.parameter("orderCreationDate", new Date().toJSON());
        return href;
    }

    static parameter(key, value, first = false) {
        if (value === undefined || value === null)
            return "";
        return (first ? "" : "&") + key + "=" + value;
    }

    static arrayToParameterValue(array) {
        let res = "";
        for (let index in array) {
            res += array[index] + "#";
        }

        return res.substr(0, res.length - 1);
    }

    render() {

        const emailHref = this.props.isSelectedOrder ? this.orderEmailHref.bind(this)() : null;

        return (
            <IconButton tooltip={this.props.labels.send}>
                <a href={emailHref}>
                    <SendIcon/>
                </a>
            </IconButton>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: getLabels(state).orderPage.actionButtons,
        selectedOrganization: getSelectedOrganization(state),
        selectedOrder: getSelectedOrder(state),
        isSelectedOrder: isSelectedOrder(state),
    };
}

export default connect(mapStateToProps)(SendOfferButton);
