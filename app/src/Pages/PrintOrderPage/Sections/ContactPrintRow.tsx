import React from 'react';
import {getKey} from "../../OrderPage/Sections/ContactSection/ContactRow";
import {PrintOrderConnectedText} from "./ConnectedCustomComponents/PrintOrderConnectedFields";

export default function ContactPrintRow(props: ContactPrintRowProps) {
    const isFinancial = props.isFinancial;

    return (
        <div>
            <div>
                {isFinancial ? props.financialContactTitle : null}
            </div>

            <PrintOrderConnectedText name={getKey("contactFirstName", isFinancial)}/>
            <PrintOrderConnectedText name={getKey("contactLastName", isFinancial)}/>
            <PrintOrderConnectedText name={getKey("contactJob", isFinancial)}/>
            <PrintOrderConnectedText name={getKey("contactPhone1", isFinancial)}/>
            <PrintOrderConnectedText name={getKey("contactEmail", isFinancial)}/>
            <PrintOrderConnectedText name={getKey("contactPhone2", isFinancial)}/>
            <PrintOrderConnectedText name={getKey("contactPhoneExtension", isFinancial)}/>
            <PrintOrderConnectedText name={getKey("contactFax", isFinancial)}/>
        </div>
    );
}

interface ContactPrintRowProps {
    isFinancial: boolean;
    financialContactTitle: string,
}
