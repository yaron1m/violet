import React from 'react';
import ActionButtonsBox from "../../../Components/ActionButtons/ActionButtonsBox";
import OrganizationSaveIconContainer from "./OrganizationSaveIconContainer";
import OrganizationRefreshIconContainer from "./OrganizationRefreshIconContainer";

export default function OrganizationActionButtons() {
    return (
        <ActionButtonsBox>
            <OrganizationSaveIconContainer/>
            <OrganizationRefreshIconContainer/>
        </ActionButtonsBox>
    );
}
