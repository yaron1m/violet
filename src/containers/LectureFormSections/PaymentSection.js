import React from 'react';
import labels from '../../lables.json';
import SectionBase from "./SectionBase";
import FormDatePicker from "../LectureFormFields/FormDatePicker";
import FormTextField from "../LectureFormFields/FormTextField";


class PaymentSection extends React.Component {

    render() {
        const sectionLabels = labels.lectureForm.paymentSection;
        const style = {
            flex: {
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "flex-end"
            }
        };

        return (
            <SectionBase
                title={sectionLabels.sectionName}
            >
                <div style={style.flex}>
                    <FormTextField title={sectionLabels.fields.paymentConditions}/>
                    <FormTextField title={sectionLabels.fields.actualPayDay}/>
                    <FormTextField title={sectionLabels.fields.proformaInvoiceNumber}/>
                    <FormDatePicker title={sectionLabels.fields.proformaInvoiceDate}/>
                    <FormTextField title={sectionLabels.fields.taxInvoiceNumber}/>
                    <FormDatePicker title={sectionLabels.fields.taxInvoiceDate}/>
                </div>


            </SectionBase>
        );
    }
}

export default PaymentSection;