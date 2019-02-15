import {connect} from 'react-redux';
import {getSelectedOrganization} from "../../../../Store/SelectedOrganization/Selectors";
import {updateSelectedOrganization} from "../../../../Store/SelectedOrganization/Actions";
import {getOrderSectionsLabels} from "../../../../Store/Labels/Selectors";
import CustomText from "../../../../Components/CustomComponents/CustomTextField";
import CustomToggle from "../../../../Components/CustomComponents/CustomToggle";
import CustomAutoComplete from "../../../../Components/CustomComponents/CustomAutoComplete";
import {getRequiredFieldsObject} from "../../../../Store/Appearance/RequiredFields/RequiredFieldsSelectors";
import {IDispatch, IState} from '../../../../Interfaces/ReduxInterfaces';
import IOrganization from '../../../../Interfaces/IOrganization';
import {Size} from '../../../../Util/Constants/Size';
import {ISuggestion} from '../../../../Components/AutoSuggest';

function mapStateToProps(state: IState) {
    return {
        titles: getOrderSectionsLabels(state).organization.titles,
        values: getSelectedOrganization(state),
        requiredFields: getRequiredFieldsObject(state).organization,
    };
}

function mapDispatchToProps(dispatch: IDispatch) {
    return {
        updateAction: (key: string, value: any) => dispatch(updateSelectedOrganization(key, value)),
    };
}

function mergeProps(stateProps: {
    titles: any; values: IOrganization; requiredFields: string[];
}, dispatchProps: {
    updateAction: (key: string, value: any) => void;
}, ownProps: {
    name: string; size?: Size; suggestions?: ISuggestion[]; onSuggestionSelected?: (suggestion: ISuggestion) => void;
}) {
    return {
        titles: stateProps.titles,
        values: stateProps.values,
        requiredFields: stateProps.requiredFields,
        updateAction: dispatchProps.updateAction,
        name: ownProps.name,
        size: ownProps.size,
        suggestions: ownProps.suggestions,
        onSuggestionSelected: ownProps.onSuggestionSelected,
    };

}

export const OrganizationCustomText = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomText);
export const OrganizationCustomAutoComplete = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomAutoComplete);
export const OrganizationCustomToggle = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomToggle);
