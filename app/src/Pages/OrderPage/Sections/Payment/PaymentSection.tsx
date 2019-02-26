import React from "react";
import CustomPaper from "../../../../Components/CustomComponents/CustomPaper";
import ContactRowContainer from "../ContactSection/ContactRowContainer";
import CalculateIcon from "@material-ui/icons/LocalAtm";
import {Size} from "../../../../Util/Constants/Size";
import {OrderCustomText} from "../ConnectedCustomComponents/OrderCustomFields";
import CustomDivider from "../../../../Components/CustomComponents/CustomDivider";
import {CustomIconButton} from "../../../../Components/CustomComponents/CustomButtons";

export default function PaymentSection(props: PaymentSectionProps) {
    return (
        <CustomPaper title="תשלום">
            <div>איש קשר לתשלום</div>

            <ContactRowContainer isFinancialContacts={true}/>

            <CustomDivider/>

            <div>
                <CustomIconButton
                    onClick={props.calculateSum}
                    tooltip="יבא איש קשר"
                    style={{marginBottom: 10, marginLeft: 10}}
                >
                    <CalculateIcon/>
                </CustomIconButton>

                <OrderCustomText title="מחיר הרצאות" name="cost"/>
                <OrderCustomText title="מרחק כיוון אחד" name="oneWayDistance" size={Size.M}/>
                <OrderCustomText title="עלות נסיעות" name="travelExpenses" size={Size.M}/>
                <OrderCustomText title="עלויות נוספות" name="extraCosts" size={Size.M}/>
                <OrderCustomText title='סכום לפני מע"מ' name="sum"/>
                <OrderCustomText title='מע"מ' name="vat" size={Size.M}/>
                <OrderCustomText title='סה"כ לתשלום' name="totalSum"/>
            </div>
        </CustomPaper>
    );
}

interface PaymentSectionProps {
    calculateSum: () => void;
}
