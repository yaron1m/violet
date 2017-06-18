import React from 'react';
import labels from '../../../lables.json';
import FormTextField from "../Fields/FormTextField";
import FormDatePicker from "../Fields/FormDatePicker";
import FormAutocomleteTextField from "../Fields/FormAutocomleteTextField";
import {Checkbox} from "material-ui";

class FormLectureField extends React.Component {

    render() {
        const sectionLabels = labels.lectureForm.contactsSection;

        const style = {
            flex: {
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "flex-end",
                padding: 10,
            },
            checkbox: {
                marginBottom: 10,
                maxWidth:50
            },
        };

        return (
            <div style={style.flex}>
                <Checkbox
                    style={style.checkbox}
                />
                <FormTextField title={sectionLabels.fields.firstName}/>
                <FormTextField title={sectionLabels.fields.lastName}/>
                <FormTextField title={sectionLabels.fields.phone1} size="M"/>
                <FormTextField title={sectionLabels.fields.phone2} size="M"/>
                <FormTextField title={sectionLabels.fields.phoneExtension} size="M"/>
                <FormTextField title={sectionLabels.fields.email}/>
                <FormTextField title={sectionLabels.fields.fax} size="M"/>
                <FormTextField title={sectionLabels.fields.job} size="M"/>
            </div>
        );
    }
}

export default FormLectureField;
