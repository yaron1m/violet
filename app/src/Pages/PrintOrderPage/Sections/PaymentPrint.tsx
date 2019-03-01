import React from "react";
import PrintSection from "../../../Components/CustomComponents/OrderPrint/PrintSection";
import ContactsPrintRow from "./ContactPrintRowContainer";
import CustomDivider from "../../../Components/CustomComponents/CustomDivider";
import PrintTextField from "../../../Components/CustomComponents/OrderPrint/PrintTextField";
import IOrder from "../../../Interfaces/IOrder";

export default function (props: { selectedOrder: IOrder }) {
    return (
        <PrintSection title="תשלום">
            <ContactsPrintRow isFinancial={true}/>

            <CustomDivider/>

            <PrintTextField title="מחיר ההרצאות" value={props.selectedOrder.cost}/>
            <PrintTextField title="מרחק כיוון אחד" value={props.selectedOrder.oneWayDistance}/>
            <PrintTextField title="עלות נסיעות" value={props.selectedOrder.travelExpenses}/>
            <PrintTextField title="עלויות נוספות" value={props.selectedOrder.extraCosts}/>
            <PrintTextField title='סכום לפני מע"מ' value={props.selectedOrder.sum}/>
            <PrintTextField title='מע"מ' value={props.selectedOrder.vat}/>
            <PrintTextField title='סה"כ לתשלום' value={props.selectedOrder.totalSum}/>
        </PrintSection>
    );
}