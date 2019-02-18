import React from "react";
import PrintSection from "../../../Components/CustomComponents/OrderPrint/PrintSection";
import {PrintOrderConnectedBoolean, PrintOrderConnectedDate, PrintOrderConnectedText} from "./ConnectedCustomComponents/PrintOrderConnectedFields";

export default function (props: { sectionName: string, display: boolean }) {
    if (!props.display)
        return null;

    return (
        <PrintSection title={props.sectionName}>
            <PrintOrderConnectedBoolean name="followUpRequired"/>
            <PrintOrderConnectedDate name="followUpDate"/>
            <PrintOrderConnectedText name="followUpDetails"/>
        </PrintSection>
    );
}