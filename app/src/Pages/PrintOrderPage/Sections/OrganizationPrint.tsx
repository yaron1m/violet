import React from "react";
import PrintSection from "../../../Components/CustomComponents/OrderPrint/PrintSection";
import PrintTextField from "../../../Components/CustomComponents/OrderPrint/PrintTextField";
import IOrganization from "../../../Interfaces/IOrganization";

export default function (props: { selectedOrganization: IOrganization }) {
    return (
        <PrintSection title="פרטי הארגון">
            <PrintTextField value={props.selectedOrganization.organizationName} title="שם הארגון"/>
            <PrintTextField value={props.selectedOrganization.organizationAddress} title="כתובת"/>
            <PrintTextField value={props.selectedOrganization.organizationCity} title="עיר"/>
            <PrintTextField value={props.selectedOrganization.organizationPostalCode} title="מיקוד"/>
            <PrintTextField value={props.selectedOrganization.companyId} title="ח.פ / ע.מ"/>
            <PrintTextField value={props.selectedOrganization.paymentConditions} title="תנאי תשלום"/>
            <PrintTextField value={props.selectedOrganization.referralWay} title="איך הגיע אלינו"/>
            <PrintTextField value={props.selectedOrganization.referralWayDetails} title="פרטי ההגעה"/>
        </PrintSection>
    );
}