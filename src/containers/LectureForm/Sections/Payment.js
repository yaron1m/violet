import React from 'react';
import labels from '../../../lables.json';
import PageBase from "../SectionBases/PageBase";
import FormDatePicker from "../Fields/FormDatePicker";
import FormTextField from "../Fields/FormTextField";


class Payment extends React.Component {

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
            <PageBase
                title={sectionLabels.sectionName}
            >
                <div style={style.flex}>
                    <FormTextField title={sectionLabels.fields.paymentConditions}/>
                    <FormTextField title={sectionLabels.fields.expectedPayDay}/>
                    <FormTextField title={sectionLabels.fields.actualPayDay}/>
                    <FormTextField title={sectionLabels.fields.proformaInvoiceNumber}/>
                    <FormDatePicker title={sectionLabels.fields.proformaInvoiceDate}/>
                    <FormTextField title={sectionLabels.fields.taxInvoiceNumber}/>
                    <FormDatePicker title={sectionLabels.fields.taxInvoiceDate}/>
                </div>


            </PageBase>
        );
    }
}

export default Payment;