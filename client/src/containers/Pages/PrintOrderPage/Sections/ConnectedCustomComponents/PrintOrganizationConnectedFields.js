import {connect} from 'react-redux';
import {getSelectedOrganization} from "../../../../../store/SelectedOrganization/Selectors";
import {getLabels} from "../../../../../store/Labels/Reducer";
import PrintField from "../../../../../components/CustomComponents/OrderPrint/PrintField";

function mapStateToProps(state, ownProps) {
    return {
        titles: getLabels(state).pages.orderPage.sections.titles,
        values: getSelectedOrganization(state),
        updateAction: function(){},
        ...ownProps,
    };
}

export const PrintOrganizationConnectedText = connect(mapStateToProps)(PrintField);
