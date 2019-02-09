import React from "react";
import SearchBox from './SearchBox';
import {connect} from 'react-redux';
import {getLabels} from "../../../Store/Labels/Selectors";
import {getOrganizationById, getOrganizations} from "../../../Store/Organizations/Selectors";
import {selectOrganization} from "../../../Store/SelectedOrganization/Actions";
import {getOrders, getPublicCourseParticipantsSummary} from "../../../Store/Orders/Selectors";
import {redirect} from "../../../Util/HistoryUtil";
import Colors from "../../../Util/Constants/Colors";
import * as _ from "lodash";
import EventIcon from '@material-ui/icons/EventNote';
import BusinessIcon from '@material-ui/icons/Business';
import PersonIcon from '@material-ui/icons/Person';
import {flexStyle} from "../../../Components/CustomComponents/CustomPaper";
import {IDispatch, IState} from '../../../Interfaces/ReduxInterfaces';
import {ISuggestion} from '../../../Components/AutoSuggest';
import {EntityType} from "../../../Util/Constants/EntityType";
import IOrganization from '../../../Interfaces/IOrganization';
import IOrder from '../../../Interfaces/IOrder';
import {selectOrder} from '../../../Store/SelectedOrder/Actions';
import {Path} from '../../../Pages/Path';

export interface SearchSuggestion extends ISuggestion {
    entityType?: EntityType;
    orderId?: number;
    organizationId?: number;
}

export function handleRequest(chosenRequest: SearchSuggestion, dispatch: IDispatch) {
    switch (chosenRequest.entityType) {
        case EntityType.organization:
            if (chosenRequest.organizationId == undefined) {
                console.error("Undefined search property");
                return;
            }
            dispatch(selectOrganization(chosenRequest.organizationId));
            redirect(Path.organization);
            return;

        case EntityType.order:
        case EntityType.publicCourseParticipant:
            if (chosenRequest.orderId == undefined || chosenRequest.organizationId == undefined) {
                console.error("Undefined search property");
                return;
            }
            dispatch(selectOrder(chosenRequest.orderId));
            dispatch(selectOrganization(chosenRequest.organizationId));

            redirect(Path.form);
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

function renderSuggestion(suggestion: SearchSuggestion) {
    let icon;
    switch (suggestion.entityType) {
        case EntityType.organization:
            icon = <BusinessIcon style={styles.organizationIcon}/>;
            break;

        case EntityType.order:
            icon = <EventIcon style={styles.orderIcon}/>;
            break;

        case EntityType.publicCourseParticipant:
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

export function getSuggestions(organizations: IOrganization[], orders: IOrder[],
                               publicCourseParticipants: { orderId: number; organizationId: number; participantFirstName: string; participantLastName: string; publicCourseName: string; }[],
                               getOrganizationName: (id: string) => string)
    : SearchSuggestion[] {
    if (_.isEmpty(organizations))
        return [];

    const organizationNamesObjects: SearchSuggestion[] = organizations.map(
        (org): SearchSuggestion => {
            const text = org.organizationName + (org.companyId ? " (" + org.companyId + ")" : "");

            return {
                label: text,
                entityType: EntityType.organization,
                organizationId: org.id
            };
        });

    const orderNumbersObjects: SearchSuggestion[] = _.values(orders).map(
        (order): SearchSuggestion => ({
            label: order.id + " - " + getOrganizationName(order.organizationId.toString()),
            entityType: EntityType.order,
            orderId: order.id,
            organizationId: order.organizationId,
        }));

    const participantsObjects: SearchSuggestion[] = _.values(publicCourseParticipants).map(
        (participant): SearchSuggestion => ({
            label: `${participant.orderId} - ${getOrganizationName(participant.organizationId.toString())} - ` +
                `${participant.participantFirstName} ${participant.participantLastName} - ${participant.publicCourseName}`,
            entityType: EntityType.publicCourseParticipant,
            orderId: participant.orderId,
            organizationId: participant.organizationId,
        }));

    return _.concat(organizationNamesObjects, orderNumbersObjects, participantsObjects);
}

function mapStateToProps(state: IState) {
    const organizations = getOrganizations(state);
    const orders = getOrders(state);
    const publicCourseParticipantsSummary = getPublicCourseParticipantsSummary(state);
    const getOrganizationName = (id: string) => getOrganizationById(state, id).organizationName;

    return {
        hintText: getLabels(state).header.searchLineHint,
        suggestions: getSuggestions(organizations, orders, publicCourseParticipantsSummary, getOrganizationName) as ISuggestion[],
    };
}

function mapDispatchToProps(dispatch: IDispatch) {
    return {
        onSuggestionSelected: (suggestion: SearchSuggestion) => handleRequest(suggestion, dispatch),
        renderSuggestion
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
