import {shouldSaveNewOrder} from "./ShouldSaveNewOrderDecider";
import IOrganization from "../../../../Interfaces/IOrganization";
import React from "react";

let openDialog: (title: string, content: string, actions?: React.ReactNode[]) => void;
let closeDialog: () => void;
let showRequiredFields: () => void;
let saveNewOrganization: () => void;
let saveNewOrder: () => void;

function callTarget(isOrderMissingFields = false, isSelectedOrganization = true, selectedOrganization = {} as IOrganization) {
    return shouldSaveNewOrder(isSelectedOrganization, selectedOrganization, openDialog,
        closeDialog, isOrderMissingFields, showRequiredFields, saveNewOrganization, saveNewOrder);
}

describe("Order Saver tests", () => {

    beforeEach(() => {
        openDialog = jest.fn();
        closeDialog = jest.fn();
        showRequiredFields = jest.fn();
        saveNewOrganization = jest.fn();
        saveNewOrder = jest.fn();
    });

    it("should return true because organization is selected and there are no missing fields", () => {
        const result = callTarget();

        expect(result).toBeTruthy();
        expect(openDialog).toHaveBeenCalledTimes(0);
        expect(closeDialog).toHaveBeenCalledTimes(0);
        expect(showRequiredFields).toHaveBeenCalledTimes(0);
        expect(saveNewOrganization).toHaveBeenCalledTimes(0);
        expect(saveNewOrder).toHaveBeenCalledTimes(0);
    });

    it("should return false because there is no selected organization", () => {
        const result = callTarget(false, false);

        expect(result).toBeFalsy();
        expect(openDialog).toHaveBeenCalledTimes(1);
        expect(openDialog).toBeCalledWith("לא נבחר ארגון", "לשמירת הזמנה יש לבחור ארגון", []);
        expect(closeDialog).toHaveBeenCalledTimes(0);
        expect(showRequiredFields).toHaveBeenCalledTimes(0);
        expect(saveNewOrganization).toHaveBeenCalledTimes(0);
        expect(saveNewOrder).toHaveBeenCalledTimes(0);
    });

    it("should return false and show actions in dialog because there is no selected organization", async () => {
        const result = callTarget(false, false, {organizationName: "name"} as IOrganization);

        expect(result).toBeFalsy();
        expect(openDialog).toHaveBeenCalledTimes(1);
        expect(closeDialog).toHaveBeenCalledTimes(0);
        expect(showRequiredFields).toHaveBeenCalledTimes(0);
        expect(saveNewOrganization).toHaveBeenCalledTimes(0);
        expect(saveNewOrder).toHaveBeenCalledTimes(0);

        const dialogContent = 'ארגון "name" אינו מזוהה. האם זהו ארגון חדש או קיים?';
        expect(openDialog).toHaveBeenCalledWith("לא נבחר ארגון", dialogContent, expect.anything());

        // @ts-ignore
        const actionButtons = openDialog.mock.calls[0][2];

        expect(actionButtons[0].props.label).toEqual("ארגון חדש");
        await actionButtons[0].props.onClick();
        expect(saveNewOrganization).toHaveBeenCalledTimes(1);
        expect(saveNewOrder).toHaveBeenCalledTimes(1);

        expect(actionButtons[1].props.label).toEqual("ארגון קיים");
        actionButtons[1].props.onClick();
        expect(closeDialog).toHaveBeenCalledTimes(1);
    });

    it("should return false because order is missing fields", () => {
        const result = callTarget(true);

        expect(result).toBeFalsy();
        expect(openDialog).toHaveBeenCalledTimes(1);
        expect(openDialog).toBeCalledWith("שדות חובה חסרים", "יש למלא את כל שדות החובה המסומנים");

        expect(closeDialog).toHaveBeenCalledTimes(0);
        expect(showRequiredFields).toHaveBeenCalledTimes(1);
        expect(saveNewOrganization).toHaveBeenCalledTimes(0);
        expect(saveNewOrder).toHaveBeenCalledTimes(0);
    });

    it("should return false because order is missing fields and not because there is no selected organization", () => {
        const result = callTarget(true, false);

        expect(result).toBeFalsy();
        expect(openDialog).toHaveBeenCalledTimes(1);
        expect(openDialog).toBeCalledWith("שדות חובה חסרים", "יש למלא את כל שדות החובה המסומנים");
        expect(closeDialog).toHaveBeenCalledTimes(0);
        expect(showRequiredFields).toHaveBeenCalledTimes(1);
        expect(saveNewOrganization).toHaveBeenCalledTimes(0);
        expect(saveNewOrder).toHaveBeenCalledTimes(0);
    });
});