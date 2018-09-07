import {connect} from 'react-redux';
import {getSelectedOrganization} from "../../../../../store/SelectedOrganization/Selectors";
import {updateSelectedOrganization} from "../../../../../store/SelectedOrganization/Actions";
import {getOrderSectionsLabels} from "../../../../../store/Labels/Selectors";
import CustomText from "../../../../../components/CustomComponents/CustomTextField";
import CustomToggle from "../../../../../components/CustomComponents/CustomToggle";
import CustomAutoComplete from "../../../../../components/CustomComponents/CustomAutoComplete";
import {getRequiredFieldsObject} from "../../../../../store/Appearance/RequiredFields/RequiredFieldsSelectors";

function mapStateToProps(state) {
    return {
        titles: getOrderSectionsLabels(state).organization.titles,
        values: getSelectedOrganization(state),
        requiredFields: getRequiredFieldsObject(state).organization,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateAction: (key, value) => dispatch(updateSelectedOrganization(key, value)),
    };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
    return {
        titles: stateProps.titles,
        values: stateProps.values,
        requiredFields: stateProps.requiredFields,
        updateAction: dispatchProps.updateAction,
        ...ownProps,
    };

}

export const OrganizationCustomText = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomText);
export const OrganizationCustomAutoComplete = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomAutoComplete);
export const OrganizationCustomToggle = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomToggle);
