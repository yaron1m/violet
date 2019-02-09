import React from 'react';
import PrintSection from "../../../Components/CustomComponents/OrderPrint/PrintSection";
import ContactsPrintRow from './ContactPrintRowContainer';
import {PrintOrderConnectedText} from "./ConnectedCustomComponents/PrintOrderConnectedFields";
import CustomDivider from "../../../Components/CustomComponents/CustomDivider";

export default function (props: { sectionName: string }) {
    return (
        <PrintSection title={props.sectionName}>
            <ContactsPrintRow isFinancial={true}/>

            <CustomDivider/>

            <PrintOrderConnectedText name="cost"/>
            <PrintOrderConnectedText name="oneWayDistance"/>
            <PrintOrderConnectedText name="travelExpenses"/>
            <PrintOrderConnectedText name="extraCosts"/>
            <PrintOrderConnectedText name="sum"/>
            <PrintOrderConnectedText name="vat"/>
            <PrintOrderConnectedText name="totalSum"/>
        </PrintSection>
    );
}