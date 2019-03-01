import React from "react";
import PrintSection from "../../../Components/CustomComponents/OrderPrint/PrintSection";
import ContactsPrintRow from "./ContactPrintRowContainer";

export default function () {
    return (
        <PrintSection title="איש קשר">
            <ContactsPrintRow isFinancial={false}/>
        </PrintSection>
    );
}