import React from 'react';
import PrintSection from "../../../Components/CustomComponents/OrderPrint/PrintSection";
import {PrintOrderConnectedText} from "./ConnectedCustomComponents/PrintOrderConnectedFields";

export default function (props: { sectionName: string }) {
    return (
        <PrintSection title={props.sectionName}>
            <PrintOrderConnectedText name="notes"/>
        </PrintSection>
    );
}