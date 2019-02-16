import React from 'react';
import CustomPaper from "../../../../Components/CustomComponents/CustomPaper";
import ContactRowContainer from '../ContactSection/ContactRowContainer';
import CalculateIcon from '@material-ui/icons/LocalAtm';
import {Size} from "../../../../Util/Constants/Size";
import {OrderCustomText} from "../ConnectedCustomComponents/OrderCustomFields";
import CustomDivider from "../../../../Components/CustomComponents/CustomDivider";
import {CustomIconButton} from "../../../../Components/CustomComponents/CustomButtons";

export default function PaymentSection(props: PaymentSectionProps) {
    return (
        <CustomPaper
            title={props.sectionName}
        >
            <div>{props.financialContactTitle}</div>

            <ContactRowContainer isFinancialContacts={true}/>

            <CustomDivider/>

            <div>
                <CustomIconButton
                    onClick={props.calculateSum}
                    tooltip={props.buttonTooltip}
                    style={{marginBottom: 10, marginLeft: 10}}
                >
                    <CalculateIcon/>
                </CustomIconButton>

                <OrderCustomText name="cost"/>
                <OrderCustomText name="oneWayDistance" size={Size.M}/>
                <OrderCustomText name="travelExpenses" size={Size.M}/>
                <OrderCustomText name="extraCosts" size={Size.M}/>
                <OrderCustomText name="sum"/>
                <OrderCustomText name="vat" size={Size.M}/>
                <OrderCustomText name="totalSum"/>
            </div>
        </CustomPaper>
    );
}

interface PaymentSectionProps {
    sectionName: string;
    calculateSum: () => void;
    financialContactTitle?: string;
    buttonTooltip: string;
}
