import React from "react";
import SearchBox from './SearchBox';
import {connect} from 'react-redux';
import {getLabels} from "../../../store/labels/reducer";
import {getOrganizations} from "../../../store/organizations/reducer";
import {selectOrder, selectOrganization} from "../../../store/selected/actions";
import {getOrders} from "../../../store/orders/selectors";
import {redirect} from "../../../util/history-util";
import Colors from "../../../util/consts/colors";
import * as _ from "lodash";
import {MenuItem} from "material-ui";
import EventIcon from 'material-ui-icons/EventNote';
import BusinessIcon from 'material-ui-icons/Business';

const sourceTypes = {
    organization: 0,
    order: 1,
};

function handleRequest(chosenRequest, dispatch) {
    switch (chosenRequest.info.type) {
        case sourceTypes.organization:
            dispatch(selectOrganization(chosenRequest.info.organizationId));
            redirect('/org');
            return;

        case sourceTypes.order:
            dispatch(selectOrder(chosenRequest.info.orderId));
            dispatch(selectOrganization(chosenRequest.info.organizationId));

            redirect('/form');
            return;

        default:
            return;
    }
}

function getDataSource(state) {
    const organizations = getOrganizations(state);
    const orders = getOrders(state);

    const organizationNamesObjects = _.values(organizations).map(
        (org) => ({
            text: org.organizationName,
            info: {
                type: sourceTypes.organization,
                organizationId: org.id
            },
            value: (<MenuItem
                primaryText={org.organizationName}
                leftIcon={<BusinessIcon color={Colors.organizationIconColor}/>}
            />)
        }));

    const orderNumbersObjects = _.values(orders).map(
        (order) => ({
            text: order.id.toString() + " - " + organizations[order.organizationId].organizationName,
            info: {
                type: sourceTypes.order,
                orderId: order.id,
                organizationId: order.organizationId,
            },
            value: (<MenuItem
                primaryText={order.id.toString() + " - " + organizations[order.organizationId].organizationName}
                leftIcon={<EventIcon color={Colors.orderIconColor}/>}
            />)
        }));

    return _.concat(organizationNamesObjects, orderNumbersObjects);
}

function mapStateToProps(state) {
    return {
        hintText: getLabels(state).header.searchLineHint,
        dataSource: getDataSource(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        handleRequest: (chosenRequest) => handleRequest(chosenRequest, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
