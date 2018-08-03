import React from "react";
import SearchBox from './SearchBox';
import {connect} from 'react-redux';
import {getLabels} from "../../../store/Labels/Reducer";
import {getOrganizations} from "../../../store/organizations/reducer";
import {selectOrganization} from "../../../store/SelectedOrganization/Actions";
import {getOrders, getPublicCourseParticipantsSummary} from "../../../store/orders/selectors";
import {redirect} from "../../../util/HistoryUtil";
import Colors from "../../../util/Constants/Colors";
import * as _ from "lodash";
import {selectOrder} from "../../../store/SelectedOrder/Actions";
import EventIcon from '@material-ui/icons/EventNote';
import BusinessIcon from '@material-ui/icons/Business';
import PersonIcon from '@material-ui/icons/Person';

const sourceTypes = {
    organization: 0,
    order: 1,
    publicCourseParticipant: 2,
};

export function handleRequest(chosenRequest, dispatch) {
    switch (chosenRequest.info.type) {
        case sourceTypes.organization:
            dispatch(selectOrganization(chosenRequest.info.organizationId));
            redirect('/org');
            return;

        case sourceTypes.order:
        case sourceTypes.publicCourseParticipant:
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

//TODO test this
function renderSuggestion(suggestion) {
    switch (suggestion.info.type) {
        case sourceTypes.organization:
            return (
                <React.Fragment>
                    <div>
                        <BusinessIcon style={styles.organizationIcon}/>
                        <span style={styles.label}>{suggestion.label}</span>
                    </div>
                </React.Fragment>
            );

        case sourceTypes.order:
            return (
                <React.Fragment>
                    <span>
                    <EventIcon style={styles.orderIcon}/>
                    </span>
                    <span style={styles.label}>{suggestion.label}</span>
                </React.Fragment>
            );

        case sourceTypes.publicCourseParticipant:
            return (
                <React.Fragment>
                    <span>
                    <PersonIcon style={styles.publicCourseParticipantIcon}/>
                    </span>
                    <span style={styles.label}>{suggestion.label}</span>
                </React.Fragment>
            );

        default:
            return suggestion.label;
    }
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
                    type: sourceTypes.organization,
                    organizationId: org.id
                },
            }
        });

    const orderNumbersObjects = _.values(orders).map(
        (order) => ({
            label: order.id.toString() + " - " + organizations[order.organizationId].organizationName,
            info: {
                type: sourceTypes.order,
                orderId: order.id,
                organizationId: order.organizationId,
            },
        }));


    const participantsObjects = _.values(publicCourseParticipants).map(
        participant => ({
            label: `${participant.orderId} - ${organizations[participant.organizationId].organizationName} - ` +
            `${participant.participantFirstName} ${participant.participantLastName}`,
            info: {
                type: sourceTypes.publicCourseParticipant,
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
