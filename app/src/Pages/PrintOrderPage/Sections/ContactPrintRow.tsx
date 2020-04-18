import React from "react";
import PrintTextField from "../../../Components/CustomComponents/OrderPrint/PrintTextField";
import {IOrder, IOrderStringField} from "@violet/common";
import _ from "lodash";

function getValue(key: string, selectedOrder: IOrder, isFinancial: boolean) {
    const rightKey = (isFinancial ? "financial" + _.upperFirst(key) : key) as IOrderStringField;
    return selectedOrder[rightKey];
}

export default function ContactPrintRow(props: ContactPrintRowProps) {
    const isFinancial = props.isFinancial;
    const selectedOrder = props.selectedOrder;

    return (
        <div>
            {isFinancial && <div>איש קשר לתשלום</div>}

            <PrintTextField title="שם פרטי" value={getValue("contactFirstName", selectedOrder, isFinancial)}/>
            <PrintTextField title="שם משפחה" value={getValue("contactLastName", selectedOrder, isFinancial)}/>
            <PrintTextField title="תפקיד" value={getValue("contactJob", selectedOrder, isFinancial)}/>
            <PrintTextField title="טלפון" value={getValue("contactPhone1", selectedOrder, isFinancial)}/>
            <PrintTextField title="דואר אלקטרוני" value={getValue("contactEmail", selectedOrder, isFinancial)}/>
            <PrintTextField title="טלפון נוסף" value={getValue("contactPhone2", selectedOrder, isFinancial)}/>
            <PrintTextField title="שלוחה" value={getValue("contactPhoneExtension", selectedOrder, isFinancial)}/>
            <PrintTextField title="פקס" value={getValue("contactFax", selectedOrder, isFinancial)}/>
        </div>
    );
}

interface ContactPrintRowProps {
    isFinancial: boolean;
    selectedOrder: IOrder,
}
