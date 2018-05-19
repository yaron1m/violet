import {connect} from 'react-redux';
import {getSelectedOrganization} from "../../../../../store/selected/reducer";
import {getLabels} from "../../../../../store/labels/reducer";
import PrintField from "../../../../../components/custom-components/OrderPrint/PrintField";

function mapStateToProps(state, ownProps) {
    return {
        titles: getLabels(state).pages.orderPage.sections.titles,
        values: getSelectedOrganization(state),
        updateAction: function(){},
        ...ownProps,
    };
}

export const PrintOrganizationConnectedText = connect(mapStateToProps)(PrintField);
