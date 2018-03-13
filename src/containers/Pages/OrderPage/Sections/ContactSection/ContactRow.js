import React from 'react';
import PropTypes from 'prop-types';
import IconButton from "material-ui/IconButton";
import PersonAddIcon from 'material-ui-icons/PersonAdd';
import ImportContactsDialogContainer from './ImportContactDialogContainer';
import _ from 'lodash';
import Sizes from "../../../../../util/consts/sizes";
import {OrderCustomText} from "../ConnectedCustomComponents/OrderCustomFields";

export default class ContactRow extends React.Component {
    constructor() {
        super();
        this.state = {
            dialogOpen: false,
        };

        this.openContactImportDialog = () => {
            if (!this.props.isSelectedOrganization) {
                this.props.openDialog(this.props.dialogText.noOrganizationSelectedTitle, this.props.dialogText.noOrganizationSelectedContent);
                return false;
            }

            this.setState({
                dialogOpen: true,
            });
        };
    }

    render() {
        const isFinancial = this.props.isFinancialContacts;

        return (
            <div>
                <ImportContactsDialogContainer
                    dialogOpen={this.state.dialogOpen}
                    isFinancialContacts={isFinancial}
                    onRequestClose={() => this.setState({dialogOpen: false})}
                />

                <IconButton
                    onClick={this.openContactImportDialog}
                    tooltip={this.props.buttonTooltip}
                    style={{marginBottom: 10, marginRight: 10}}
                >
                    <PersonAddIcon/>
                </IconButton>

                <OrderCustomText name={getKey("contactFirstName", isFinancial)} size={Sizes.M}/>
                <OrderCustomText name={getKey("contactLastName", isFinancial)} size={Sizes.M}/>
                <OrderCustomText name={getKey("contactJob", isFinancial)} size={Sizes.M}/>
                <OrderCustomText name={getKey("contactPhone1", isFinancial)} size={Sizes.M}/>
                <OrderCustomText name={getKey("contactEmail", isFinancial)} size={Sizes.XL}/>
                <OrderCustomText name={getKey("contactPhone2", isFinancial)} size={Sizes.M}/>
                <OrderCustomText name={getKey("contactPhoneExtension", isFinancial)} size={Sizes.M}/>
                <OrderCustomText name={getKey("contactFax", isFinancial)} size={Sizes.M}/>
            </div>
        );
    }
}

export function getKey(key, isFinancial) {
    return isFinancial ? "financial" + _.upperFirst(key) : key;
}

ContactRow.propTypes = {
    isFinancialContacts: PropTypes.bool.isRequired,
    dialogText: PropTypes.object.isRequired,
    isSelectedOrganization: PropTypes.bool.isRequired,
    buttonTooltip: PropTypes.string.isRequired,
    openContactImportDialog: PropTypes.func,
};
