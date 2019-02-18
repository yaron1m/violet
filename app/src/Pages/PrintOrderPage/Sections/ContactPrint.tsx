import React from "react";
import PrintSection from "../../../Components/CustomComponents/OrderPrint/PrintSection";
import ContactsPrintRow from './ContactPrintRowContainer';

export default function (props: { sectionName: string }) {
    return (
        <PrintSection
            title={props.sectionName}
        >
            <ContactsPrintRow isFinancial={false}/>
        </PrintSection>
    );
}