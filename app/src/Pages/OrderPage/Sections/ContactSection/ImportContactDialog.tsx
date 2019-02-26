import React from "react";
import CustomDialog from "../../../../Components/CustomComponents/CustomDialog";
import CustomTable from "../../../../Components/Table/CustomTable";
import * as _ from "lodash";
import CustomTableRow from "../../../../Components/Table/CustomTableRow";
import {IContact} from "./ImportContactDialogContainer";
import {IStringObject} from "../../../../Interfaces/IOrder";

export default function ImportContactsDialog(props: ImportContactsDialogProps) {
    // TODO see if I can use my custom table
    return (
        <CustomDialog
            open={props.dialogOpen}
            title={props.dialogTitle}
            onRequestClose={props.onRequestClose}
        >
            {_.isEmpty(props.contacts) ?
                <div>{props.noContactsLabel}</div> :
                <CustomTable headers={props.tableHeaders}>
                    {_.map(props.contacts, (contactDetails, index) => (
                        <CustomTableRow
                            key={index}
                            headers={props.tableHeaders}
                            element={contactDetails}
                            onEditButton={props.importContact}
                            onPickButton={props.importContact}
                        />
                    ))}
                </CustomTable>
            }

        </CustomDialog>
    );
}

interface ImportContactsDialogProps {
    dialogOpen: boolean;
    dialogTitle: string;
    noContactsLabel: string;
    contacts: IContact[];
    tableHeaders: IStringObject[];
    importContact: (element: IContact) => void;
    onRequestClose: () => void;
}
