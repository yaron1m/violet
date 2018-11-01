import React from "react";
import SearchBox from './SearchBox';
import {connect} from 'react-redux';
import {getLabels} from "../../../store/Labels/Selectors";
import {getOrganizations} from "../../../store/Organizations/Selectors";
import {selectOrganization} from "../../../store/SelectedOrganization/Actions";
import {getOrders, getPublicCourseParticipantsSummary} from "../../../store/orders/selectors";
import {redirect} from "../../../util/HistoryUtil";
import Colors from "../../../util/Constants/Colors";
import * as _ from "lodash";
import {selectOrder} from "../../../store/SelectedOrder/Actions";
import EventIcon from '@material-ui/icons/EventNote';
import BusinessIcon from '@material-ui/icons/Business';
import PersonIcon from '@material-ui/icons/Person';
import {flexStyle} from "../../../components/CustomComponents/CustomPaper";
import entityTypes from "../../../util/Constants/EntityTypes";

export function handleRequest(chosenRequest, dispatch) {
    switch (chosenRequest.info.type) {
        case entityTypes.organization:
            dispatch(selectOrganization(chosenRequest.info.organizationId));
            redirect('/org');
            return;

        case entityTypes.order:
        case entityTypes.publicCourseParticipant:
            dispatch(selectOrder(chosenRequest.info.orderId));
            dispatch(selectOrganization(chosenRequest.info.organizationId));

            redirect('/form');
            return;

        default:
            return;
    }
}

const styles = {
    organizationIcon: {
        color: Colors.organizationIconColor
    },
    orderIcon: {
        color: Colors.orderIconColor
    },
    publicCourseParticipantIcon: {
        color: Colors.publicCourseParticipantIconColor
    },
    label: {
        marginRight: 10,
    }
};

function renderSuggestion(suggestion) {
    let icon;
    switch (suggestion.info.type) {
        case entityTypes.organization:
            icon = <BusinessIcon style={styles.organizationIcon}/>;
            break;

        case entityTypes.order:
            icon = <EventIcon style={styles.orderIcon}/>;
            break;

        case entityTypes.publicCourseParticipant:
            icon = <PersonIcon style={styles.publicCourseParticipantIcon}/>;
            break;

        default:
            icon = null;
    }

    return (
        <div style={flexStyle}>
            {icon}
            <span style={styles.label}>{suggestion.label}</span>
        </div>
    );
}


export function getSuggestions(organizations, orders, publicCourseParticipants) {
    if (!organizations)
        return [];

    const organizationNamesObjects = _.values(organizations).map(
        (org) => {
            const text = org.organizationName + (org.companyId ? " (" + org.companyId + ")" : "");

            return {
                label: text,
                info: {
                    type: entityTypes.organization,
                    organizationId: org.id
                },
            }
        });

    const orderNumbersObjects = _.values(orders).map(
        (order) => ({
            label: order.id.toString() + " - " + organizations[order.organizationId].organizationName,
            info: {
                type: entityTypes.order,
                orderId: order.id,
                organizationId: order.organizationId,
            },
        }));


    const participantsObjects = _.values(publicCourseParticipants).map(
        participant => ({
            label: `${participant.orderId} - ${organizations[participant.organizationId].organizationName} - ` +
            `${participant.participantFirstName} ${participant.participantLastName} - ${participant.publicCourseName}`,
            info: {
                type: entityTypes.publicCourseParticipant,
                orderId: participant.orderId,
                organizationId: participant.organizationId,
            },
        }));

    return _.concat(organizationNamesObjects, orderNumbersObjects, participantsObjects);
}

function mapStateToProps(state) {
    const organizations = getOrganizations(state);
    const orders = getOrders(state);
    const publicCourseParticipants = getPublicCourseParticipantsSummary(state);

    return {
        hintText: getLabels(state).header.searchLineHint,
        suggestions: getSuggestions(organizations, orders, publicCourseParticipants),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onSuggestionSelected: (chosenRequest) => handleRequest(chosenRequest, dispatch),
        renderSuggestion
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
