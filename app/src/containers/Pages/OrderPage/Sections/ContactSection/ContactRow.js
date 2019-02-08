import React from 'react';
import PropTypes from 'prop-types';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ImportContactsDialogContainer from './ImportContactDialogContainer';
import _ from 'lodash';
import {Sizes} from "../../../../../util/Constants/Sizes";
import {OrderCustomText} from "../ConnectedCustomComponents/OrderCustomFields";
import {CustomIconButton} from "../../../../../Components/CustomComponents/CustomButtons";

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

                <CustomIconButton
                    onClick={this.openContactImportDialog}
                    tooltip={this.props.buttonTooltip}
                    style={{marginBottom: 10, marginLeft: 10}}
                >
                    <PersonAddIcon/>
                </CustomIconButton>

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
    openDialog: PropTypes.func,
};
