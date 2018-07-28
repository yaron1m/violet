import {connect} from 'react-redux';
import {getLabels} from "../../../../../store/Labels/Reducer";
import PropTypes from 'prop-types';
import {openDialog} from "../../../../../store/Appearance/Actions";
import ContactRow from "./ContactRow";
import {isSelectedOrganization} from "../../../../../store/SelectedOrganization/Selectors";

function mapStateToProps(state, ownProps) {
    return {
        buttonTooltip: getLabels(state).pages.orderPage.sections.contacts.importContactsDialog.buttonTooltip,
        isFinancialContacts: ownProps.isFinancialContacts,
        dialogText: getLabels(state).pages.orderPage.sections.contacts.importContactsDialog,
        isSelectedOrganization: isSelectedOrganization(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        openDialog: (title, content) => dispatch(openDialog(title, content)),
    }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(ContactRow);

Container.propTypes = {
    isFinancialContacts: PropTypes.bool.isRequired,
};

export default Container;
