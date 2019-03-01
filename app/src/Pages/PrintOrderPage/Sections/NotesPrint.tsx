import React from "react";
import PrintSection from "../../../Components/CustomComponents/OrderPrint/PrintSection";
import PrintTextField from "../../../Components/CustomComponents/OrderPrint/PrintTextField";
import IOrder from "../../../Interfaces/IOrder";

export default function (props: { selectedOrder: IOrder }) {
    return (
        <PrintSection title="הערות">
            <PrintTextField title="הערות" value={props.selectedOrder.notes}/>
        </PrintSection>
    );
}