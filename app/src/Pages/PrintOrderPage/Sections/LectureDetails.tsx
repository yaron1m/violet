import React from 'react';
import PrintSection from "../../../Components/CustomComponents/OrderPrint/PrintSection";
import {PrintOrderConnectedBoolean, PrintOrderConnectedText} from "./ConnectedCustomComponents/PrintOrderConnectedFields";
import CustomDivider from "../../../Components/CustomComponents/CustomDivider";

export default function (props: { sectionName: string, statusLabel: string }) {
    return (
        <PrintSection title={props.sectionName}>
            <PrintOrderConnectedText name="street"/>
            <PrintOrderConnectedText name="streetNumber"/>
            <PrintOrderConnectedText name="city"/>
            <PrintOrderConnectedText name="location"/>
            <PrintOrderConnectedText name="audienceType"/>
            <PrintOrderConnectedText name="daySchedule"/>

            <PrintOrderConnectedText
                name="status"
                values={{status: props.statusLabel}}
            />

            <CustomDivider/>

            <PrintOrderConnectedBoolean name="projector"/>
            <PrintOrderConnectedBoolean name="soundSystem"/>
            <PrintOrderConnectedBoolean name="microphone"/>
            <PrintOrderConnectedBoolean name="parking"/>
            <PrintOrderConnectedBoolean name="orderApproved"/>
            <PrintOrderConnectedBoolean name="sameAudience"/>
        </PrintSection>
    );
}