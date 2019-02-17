import {connect} from "react-redux";
import {getOrderSectionsLabels} from "../../../../Store/Labels/Selectors";
import {openDialog} from "../../../../Store/Appearance/Actions";
import ContactRow from "./ContactRow";
import {isSelectedOrganization} from "../../../../Store/SelectedOrganization/Selectors";
import {IDispatch, IState} from "../../../../Interfaces/ReduxInterfaces";

function mapStateToProps(state: IState, ownProps: { isFinancialContacts: boolean }) {
    return {
        buttonTooltip: getOrderSectionsLabels(state).contacts.importContactsDialog.buttonTooltip,
        isFinancialContacts: ownProps.isFinancialContacts,
        dialogText: getOrderSectionsLabels(state).contacts.importContactsDialog,
        isSelectedOrganization: isSelectedOrganization(state),
    };
}

function mapDispatchToProps(dispatch: IDispatch) {
    return {
        openDialog: (title: string, content: string) => dispatch(openDialog(title, content)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactRow);