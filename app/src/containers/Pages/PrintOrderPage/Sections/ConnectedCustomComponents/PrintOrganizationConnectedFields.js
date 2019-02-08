import {connect} from 'react-redux';
import {getSelectedOrganization} from "../../../../../store/SelectedOrganization/Selectors";
import {getOrderSectionsLabels} from "../../../../../store/Labels/Selectors";
import PrintField from "../../../../../Components/CustomComponents/OrderPrint/PrintField";

function mapStateToProps(state, ownProps) {
    return {
        titles: getOrderSectionsLabels(state).titles,
        values: getSelectedOrganization(state),
        updateAction: function(){},
        ...ownProps,
    };
}

export const PrintOrganizationConnectedText = connect(mapStateToProps)(PrintField);
