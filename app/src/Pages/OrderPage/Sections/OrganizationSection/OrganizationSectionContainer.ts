import {connect} from 'react-redux';
import _ from 'lodash';
import {selectOrganization} from "../../../../Store/SelectedOrganization/Actions";
import {getOrderSectionsLabels} from "../../../../Store/Labels/Selectors";
import {getOrganizations} from "../../../../Store/Organizations/Selectors";
import OrganizationSection, {IOrganizationSuggestion} from "./OrganizationSection";
import {toSuggestions} from "../../../../Components/AutoSuggest";
import {updateSelectedOrder} from "../../../../Store/SelectedOrder/Actions";
import {IDispatch, IState} from '../../../../Interfaces/ReduxInterfaces';

function mapStateToProps(state: IState, ownProps: { fullDetails?: boolean }) {
    return {
        sectionName: getOrderSectionsLabels(state).organization.sectionName as string,
        paymentConditionsSuggestions: toSuggestions(_.values(getOrderSectionsLabels(state).organization.paymentConditions)),
        fullDetails: ownProps.fullDetails,
        organizationSuggestions: getOrganizations(state).map(
            (org) => ({
                label: org.organizationName,
                organizationId: org.id
            })) as IOrganizationSuggestion[],
    };
}

function mapDispatchToProps(dispatch: IDispatch) {
    return {
        selectOrganization: (organizationId: number) => dispatch(selectOrganization(organizationId)),
        updateSelectedOrder: (key: string, value: any) => dispatch(updateSelectedOrder(key, value)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationSection);



