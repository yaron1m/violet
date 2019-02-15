import {connect} from 'react-redux';
import {getSelectedOrganization} from "../../../../Store/SelectedOrganization/Selectors";
import {getOrderSectionsLabels} from "../../../../Store/Labels/Selectors";
import PrintField from "../../../../Components/CustomComponents/OrderPrint/PrintField";
import {IState} from '../../../../Interfaces/ReduxInterfaces';

function mapStateToProps(state:IState) {
    return {
        titles: getOrderSectionsLabels(state).titles,
        values: getSelectedOrganization(state),
        updateAction: function(){},
        entityId: getSelectedOrganization(state).id
    };
}

export const PrintOrganizationConnectedText = connect(mapStateToProps)(PrintField);
