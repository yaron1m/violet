import React from "react";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ImportContactsDialogContainer from "./ImportContactDialogContainer";
import _ from "lodash";
import {Size} from "../../../../Util/Constants/Size";
import {OrderCustomText} from "../ConnectedCustomComponents/OrderCustomFields";
import {CustomIconButton} from "../../../../Components/CustomComponents/CustomButtons";
import {IOrderStringField} from "@violet/common";

export default class ContactRow extends React.Component<ContactRowProps> {
    state = {
        dialogOpen: false,
    };

    openContactImportDialog = () => {
        if (!this.props.isSelectedOrganization) {
            this.props.openDialog("לא נבחר ארגון", "כדי לייבא אנשי קשר יש לבחור ארגון");
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
                    tooltip="יבא איש קשר"
                    style={{marginBottom: 10, marginLeft: 10}}
                >
                    <PersonAddIcon/>
                </CustomIconButton>

                <OrderCustomText title="שם פרטי" name={getKey("contactFirstName", isFinancial)} size={Size.M}/>
                <OrderCustomText title="שם משפחה" name={getKey("contactLastName", isFinancial)} size={Size.M}/>
                <OrderCustomText title="תפקיד" name={getKey("contactJob", isFinancial)} size={Size.M}/>
                <OrderCustomText title="טלפון" name={getKey("contactPhone1", isFinancial)} size={Size.M}/>
                <OrderCustomText title="דואר אלקטרוני" name={getKey("contactEmail", isFinancial)} size={Size.XL}/>
                <OrderCustomText title="טלפון נוסף" name={getKey("contactPhone2", isFinancial)} size={Size.M}/>
                <OrderCustomText title="שלוחה" name={getKey("contactPhoneExtension", isFinancial)} size={Size.M}/>
                <OrderCustomText title="פקס" name={getKey("contactFax", isFinancial)} size={Size.M}/>
            </div>
        );
    }
}

export function getKey(key: IOrderStringField, isFinancial: boolean): IOrderStringField {
    return (isFinancial ? "financial" + _.upperFirst(key) : key) as IOrderStringField;
}

interface ContactRowProps {
    isFinancialContacts: boolean;
    isSelectedOrganization: boolean;
    openDialog: (title: string, content: string) => void;
}
