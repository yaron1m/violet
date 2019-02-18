import React from "react";
import {isEmptyValue} from "../../../../Util/StringUtil";
import {CustomFlatButton} from "../../../../Components/CustomComponents/CustomButtons";
import IOrganization from '../../../../Interfaces/IOrganization';

export function shouldSaveNewOrder(
    orderPageLabels: any,
    isSelectedOrganization: boolean,
    selectedOrganization: IOrganization,
    openDialog: (title: string, content: string, actions?: React.ReactNode[]) => void,
    closeDialog: () => void,
    isOrderMissingFields: boolean,
    showRequiredFields: () => void,
    saveNewOrganization: () => void,
    saveNewOrder: () => void
) {
    const dialogText = orderPageLabels.dialog;

    if (isOrderMissingFields) {
        //Not ready for saving - there are missing fields
        showRequiredFields();
        openDialog(dialogText.missingFieldsTitle, dialogText.missingFieldsContent);
        return false;
    }

    if (!isSelectedOrganization) {

        const dialogContent = isEmptyValue(selectedOrganization, "organizationName") ?
            dialogText.noOrganizationSelectedContent :
            dialogText.unrecognizedOrganization.replace("{0}", selectedOrganization.organizationName);
        const dialogActions = getOrganizationDialogActions(selectedOrganization, dialogText, closeDialog, saveNewOrganization, saveNewOrder);
        openDialog(dialogText.noOrganizationSelectedTitle, dialogContent, dialogActions);
        return false;
    }

    return true;
}

function getOrganizationDialogActions(
    selectedOrganization: IOrganization,
    dialogLabels: any,
    closeDialog: () => void,
    saveNewOrganization: () => void,
    saveNewOrder: () => void
) {
    if (isEmptyValue(selectedOrganization, "organizationName"))
        return [];

    return [
        <CustomFlatButton
            key={dialogLabels.newOrganization}
            label={dialogLabels.newOrganization}
            onClick={async () => {
                await saveNewOrganization();
                saveNewOrder();
            }}
        />,
        < CustomFlatButton
            key={dialogLabels.existingOrganization}
            label={dialogLabels.existingOrganization}
            onClick={closeDialog}
        />
    ];
}
