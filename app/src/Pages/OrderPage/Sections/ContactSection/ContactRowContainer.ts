import {connect} from "react-redux";
import {openDialog} from "../../../../Store/Appearance/Actions";
import ContactRow from "./ContactRow";
import {isSelectedOrganization} from "../../../../Store/SelectedOrganization/Selectors";
import {IDispatch, IState} from "../../../../Interfaces/ReduxInterfaces";

function mapStateToProps(state: IState, ownProps: { isFinancialContacts: boolean }) {
    return {
        isFinancialContacts: ownProps.isFinancialContacts,
        isSelectedOrganization: isSelectedOrganization(state),
    };
}

function mapDispatchToProps(dispatch: IDispatch) {
    return {
        openDialog: (title: string, content: string) => dispatch(openDialog(title, content)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactRow);