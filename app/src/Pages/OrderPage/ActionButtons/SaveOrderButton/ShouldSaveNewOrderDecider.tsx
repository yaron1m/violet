import React from "react";
import {isEmptyValue} from "../../../../Util/StringUtil";
import {CustomFlatButton} from "../../../../Components/CustomComponents/CustomButtons";
import {IOrganization} from "@violet/common";

export function shouldSaveNewOrder(
    isSelectedOrganization: boolean,
    selectedOrganization: IOrganization,
    openDialog: (title: string, content: string, actions?: React.ReactNode[]) => void,
    closeDialog: () => void,
    isOrderMissingFields: boolean,
    showRequiredFields: () => void,
    saveNewOrganization: () => void,
    saveNewOrder: () => void
) {

    if (isOrderMissingFields) {
        // Not ready for saving - there are missing fields
        showRequiredFields();
        openDialog("שדות חובה חסרים", "יש למלא את כל שדות החובה המסומנים");
        return false;
    }

    if (!isSelectedOrganization) {
        const dialogContent = isEmptyValue(selectedOrganization, "organizationName") ?
            "לשמירת הזמנה יש לבחור ארגון" :
            'ארגון "{0}" אינו מזוהה. האם זהו ארגון חדש או קיים?'.replace("{0}", selectedOrganization.organizationName);
        const dialogActions = getOrganizationDialogActions(selectedOrganization, closeDialog, saveNewOrganization, saveNewOrder);
        openDialog("לא נבחר ארגון", dialogContent, dialogActions);
        return false;
    }

    return true;
}

function getOrganizationDialogActions(
    selectedOrganization: IOrganization,
    closeDialog: () => void,
    saveNewOrganization: () => void,
    saveNewOrder: () => void
) {
    if (isEmptyValue(selectedOrganization, "organizationName"))
        return [];

    return [
        <CustomFlatButton
            key="ארגון חדש"
            label="ארגון חדש"
            onClick={async () => {
                await saveNewOrganization();
                saveNewOrder();
            }}
        />,
        < CustomFlatButton
            key="ארגון קיים"
            label="ארגון קיים"
            onClick={closeDialog}
        />
    ];
}
