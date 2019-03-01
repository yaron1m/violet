import {connect} from "react-redux";
import _ from "lodash";
import {selectOrganization, updateSelectedOrganization} from "../../../../Store/SelectedOrganization/Actions";
import {getOrderSectionsLabels} from "../../../../Store/Labels/Selectors";
import {getOrganizations} from "../../../../Store/Organizations/Selectors";
import OrganizationSection, {IOrganizationSuggestion} from "./OrganizationSection";
import {toSuggestions} from "../../../../Components/AutoSuggest";
import {updateSelectedOrder} from "../../../../Store/SelectedOrder/Actions";
import {IDispatch, IState} from "../../../../Interfaces/ReduxInterfaces";
import {getReferralWays} from "../../../../Store/Lists/Selectors";
import {createOptions} from "../../../../Components/CustomComponents/CustomSelectField";
import {getSelectedOrganization} from "../../../../Store/SelectedOrganization/Selectors";
import {getRequiredFieldsObject} from "../../../../Store/Appearance/RequiredFields/RequiredFieldsSelectors";

function mapStateToProps(state: IState, ownProps: { fullDetails: boolean }) {
    return {
        fullDetails: ownProps.fullDetails,
        organization: getSelectedOrganization(state),
        requiredFields: getRequiredFieldsObject(state).organization,
        paymentConditionsSuggestions: toSuggestions(_.values(getOrderSectionsLabels(state).organization.paymentConditions)),
        referralWayOptions: createOptions(getReferralWays(state)),
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
        onOrganizationChange: (key: string) => (value: string) => dispatch(updateSelectedOrganization(key, value)),
        onOrganizationChangeBoolean: (key: string) => (value: boolean) => dispatch(updateSelectedOrganization(key, value)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationSection);
