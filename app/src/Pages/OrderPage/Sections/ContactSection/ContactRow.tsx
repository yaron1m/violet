import React from 'react';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ImportContactsDialogContainer from './ImportContactDialogContainer';
import _ from 'lodash';
import {Size} from "../../../../util/Constants/Size";
import {OrderCustomText} from "../ConnectedCustomComponents/OrderCustomFields";
import {CustomIconButton} from "../../../../Components/CustomComponents/CustomButtons";

export default class ContactRow extends React.Component<ContactRowProps> {
    state = {
        dialogOpen: false,
    };

    openContactImportDialog = () => {
        if (!this.props.isSelectedOrganization) {
            this.props.openDialog(this.props.dialogText.noOrganizationSelectedTitle, this.props.dialogText.noOrganizationSelectedContent);
            return;
        }

        this.setState({
            dialogOpen: true,
        });
    };

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

                <OrderCustomText name={getKey("contactFirstName", isFinancial)} size={Size.M}/>
                <OrderCustomText name={getKey("contactLastName", isFinancial)} size={Size.M}/>
                <OrderCustomText name={getKey("contactJob", isFinancial)} size={Size.M}/>
                <OrderCustomText name={getKey("contactPhone1", isFinancial)} size={Size.M}/>
                <OrderCustomText name={getKey("contactEmail", isFinancial)} size={Size.XL}/>
                <OrderCustomText name={getKey("contactPhone2", isFinancial)} size={Size.M}/>
                <OrderCustomText name={getKey("contactPhoneExtension", isFinancial)} size={Size.M}/>
                <OrderCustomText name={getKey("contactFax", isFinancial)} size={Size.M}/>
            </div>
        );
    }
}

export function getKey(key: string, isFinancial: boolean) {
    return isFinancial ? "financial" + _.upperFirst(key) : key;
}

interface ContactRowProps {
    isFinancialContacts: boolean;
    dialogText: any;
    isSelectedOrganization: boolean;
    buttonTooltip: string;
    openDialog: (title: string, content: string) => void;
}
