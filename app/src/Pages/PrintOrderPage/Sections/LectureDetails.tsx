import React from "react";
import PrintSection from "../../../Components/CustomComponents/OrderPrint/PrintSection";
import CustomDivider from "../../../Components/CustomComponents/CustomDivider";
import IOrder from "../../../Interfaces/IOrder";
import PrintTextField from "../../../Components/CustomComponents/OrderPrint/PrintTextField";
import PrintBoolean from "../../../Components/CustomComponents/OrderPrint/PrintBoolean";
import {getOrderStatusLabel} from "../../../Util/Constants/Status";

export default function (props: {selectedOrder: IOrder }) {
    return (
        <PrintSection title="פרטי ההרצאה">
            <PrintTextField value={props.selectedOrder.street} title="רחוב"/>
            <PrintTextField value={props.selectedOrder.streetNumber} title="מספר"/>
            <PrintTextField value={props.selectedOrder.city} title="עיר"/>
            <PrintTextField value={props.selectedOrder.location} title="מיקום"/>
            <PrintTextField value={props.selectedOrder.audienceType} title="קהל היעד"/>
            <PrintTextField value={props.selectedOrder.daySchedule} title='מהות היום + לו"ז'/>

            <PrintTextField title="סטאטוס" value={getOrderStatusLabel(props.selectedOrder)}/>

            <CustomDivider/>

            <PrintBoolean value={props.selectedOrder.projector} title="מקרן"/>
            <PrintBoolean value={props.selectedOrder.soundSystem} title="מערכת הגברה"/>
            <PrintBoolean value={props.selectedOrder.microphone} title="מיקרופון דש"/>
            <PrintBoolean value={props.selectedOrder.parking} title="חניה"/>
            <PrintBoolean value={props.selectedOrder.orderApproved} title="הזמנה אושרה"/>
            <PrintBoolean value={props.selectedOrder.sameAudience} title="קהל יעד זהה"/>
        </PrintSection>
    );
}