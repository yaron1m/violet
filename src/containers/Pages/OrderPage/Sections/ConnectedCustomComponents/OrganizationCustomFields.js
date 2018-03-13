import {connect} from 'react-redux';
import {getSelectedOrganization} from "../../../../../store/selected/reducer";
import {getRequiredFields} from "../../../../../store/required-fields/reducer";
import {updateSelectedOrganization} from "../../../../../store/selected/actions";
import {getLabels} from "../../../../../store/labels/reducer";
import CustomText from "../../../../../components/custom-components/custom-text-field";
import CustomToggle from "../../../../../components/custom-components/custom-toggle";
import CustomAutoComplete from "../../../../../components/custom-components/custom-autocomplete";

function mapStateToProps(state) {
    return {
        titles: getLabels(state).pages.orderPage.sections.organization.titles,
        values: getSelectedOrganization(state),
        requiredFields: getRequiredFields(state).organization,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateAction: (key, value) => dispatch(updateSelectedOrganization(key, value)),
    };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
    return {
        data:{
            titles: stateProps.titles,
            values: stateProps.values,
            requiredFields: stateProps.requiredFields,
            updateAction: dispatchProps.updateAction,
            ...ownProps,
        },
        ...ownProps,
    };

}

export const OrganizationCustomText = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomText);
export const OrganizationCustomAutoComplete = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomAutoComplete);
export const OrganizationCustomToggle = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomToggle);