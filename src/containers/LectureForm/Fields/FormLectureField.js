import React from 'react';
import labels from '../../../lables.json';
import FormTextField from "../Fields/FormTextField";
import FormDatePicker from "../Fields/FormDatePicker";
import FormAutocomleteTextField from "../Fields/FormAutocomleteTextField";

class FormLectureField extends React.Component {

    render() {
        const sectionLabels = labels.lectureForm.lectureDetailsSection.lectureTimesSection;

        const style = {
            flex: {
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "flex-end",
                padding: 10,
            }
        };

        return (
            <div style={style.flex}>
                <FormDatePicker title={sectionLabels.fields.date}/>
                <FormTextField title={sectionLabels.fields.startTime} size="M"/>
                <FormTextField title={sectionLabels.fields.endTime} size="M"/>
                <FormTextField title={sectionLabels.fields.length} size="M"/>
                <FormAutocomleteTextField title={sectionLabels.fields.topic}/>
                <FormTextField title={sectionLabels.fields.audienceSize} size="M"/>
                <FormTextField title={sectionLabels.fields.shirtColor} size="M"/>
                <FormTextField title={sectionLabels.fields.tie} size="M"/>
            </div>
        );
    }
}

export default FormLectureField;
