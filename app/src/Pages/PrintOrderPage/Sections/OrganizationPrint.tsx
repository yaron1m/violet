import React from "react";
import PrintSection from "../../../Components/CustomComponents/OrderPrint/PrintSection";
import {PrintOrganizationConnectedText} from "./ConnectedCustomComponents/PrintOrganizationConnectedFields";

export default function (props: { sectionName: string }) {
    return (
        <PrintSection title={props.sectionName}>
            <PrintOrganizationConnectedText name="organizationName"/>
            <PrintOrganizationConnectedText name="organizationAddress"/>
            <PrintOrganizationConnectedText name="organizationCity"/>
            <PrintOrganizationConnectedText name="organizationPostalCode"/>
            <PrintOrganizationConnectedText name="companyId"/>
            <PrintOrganizationConnectedText name="paymentConditions"/>
            <PrintOrganizationConnectedText name="howReachedUs"/>
        </PrintSection>
    );
}