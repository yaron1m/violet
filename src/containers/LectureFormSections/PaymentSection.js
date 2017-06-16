import React from 'react';
import labels from '../../lables.json';
import SectionBase from "./SectionBase";
import FormDatePicker from "../LectureFormFields/FormDatePicker";
import FormTextField from "../LectureFormFields/FormTextField";


class LectureDetailsSection extends React.Component {

    render() {
        const sectionLabels = labels.lectureForm.paymentSection;
        // const style = {
        //     toggle: {
        //         maxWidth: 250
        //     },
        //     textField: {
        //         marginLeft: 20,
        //     },
        //     floatingLabelText: {
        //         color: black
        //     }
        // };

        return (
            <SectionBase title={sectionLabels.sectionName}>
                <FormTextField title={sectionLabels.fields.paymentConditions}/>
                <FormTextField title={sectionLabels.fields.actualPayDay}/>
                <FormTextField title={sectionLabels.fields.proformaInvoiceNumber}/>
                <FormDatePicker title={sectionLabels.fields.proformaInvoiceDate}/>
                <FormTextField title={sectionLabels.fields.taxInvoiceNumber}/>
                <FormDatePicker title={sectionLabels.fields.taxInvoiceDate}/>

            </SectionBase>
        );
    }
}

export default LectureDetailsSection;