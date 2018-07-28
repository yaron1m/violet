import React from 'react';
import {ActionButtonsBox} from "../../../../components/ActionButtons/ActionButtonsBox";
import OrganizationSaveIconContainer from "./OrganizationSaveIconContainer";
import OrganizationRefreshIconContainer from "./OrganizationRefreshIconContainer";

export default class OrganizationActionButtons extends React.Component {
    render() {
        return (
            <ActionButtonsBox>
                <OrganizationSaveIconContainer/>
                <OrganizationRefreshIconContainer/>
            </ActionButtonsBox>
        );
    }
}
