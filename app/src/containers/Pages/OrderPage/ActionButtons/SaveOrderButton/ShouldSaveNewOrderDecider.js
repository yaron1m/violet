import React from 'react';
import {isEmptyValue} from "../../../../../util/StringUtil";
import {CustomFlatButton} from "../../../../../components/CustomComponents/CustomButtons";

export function shouldSaveNewOrder(orderPageLabels, isSelectedOrganization, selectedOrganization, openDialog,
                                   closeDialog, isOrderMissingFields, showRequiredFields, saveNewOrganization, saveNewOrder) {

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
        const dialogActions = getOrganizationDialogActions(isSelectedOrganization, selectedOrganization, dialogText, closeDialog, saveNewOrganization, saveNewOrder);
        openDialog(dialogText.noOrganizationSelectedTitle, dialogContent, dialogActions);
        return false;
    }

    return true;
}

function getOrganizationDialogActions(isSelectedOrganization, selectedOrganization, dialogLabels, closeDialog, saveNewOrganization, saveNewOrder) {
    if (isEmptyValue(selectedOrganization, "organizationName"))
        return null;

    return [
        <CustomFlatButton
            key={dialogLabels.newOrganization}
            label={dialogLabels.newOrganization}
            onClick={async () => {
                await saveNewOrganization();
                saveNewOrder();
            }}
        />,
        <CustomFlatButton
            key={dialogLabels.existingOrganization}
            label={dialogLabels.existingOrganization}
            onClick={closeDialog}
        />,
    ];
}
