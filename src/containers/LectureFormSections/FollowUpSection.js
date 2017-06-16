import React from 'react';
import labels from '../../lables.json';
import SectionBase from "./SectionBase";
import Toggle from "material-ui/Toggle";
import FormDatePicker from "../LectureFormFields/FormDatePicker";
import TextField from 'material-ui/TextField';
import {black} from 'material-ui/styles/colors';


class LectureDetailsSection extends React.Component {

    render() {
        const sectionLabels = labels.lectureForm.followUpSection;
        const style = {
            toggle: {
                maxWidth: 250
            },
            textField: {
                marginLeft: 20,
            },
            floatingLabelText: {
                color: black
            }
        };

        return (
            <SectionBase title={sectionLabels.sectionName}>
                <Toggle
                    label={sectionLabels.fields.followUpRequired}
                    style={style.toggle}
                />
                <FormDatePicker title={sectionLabels.fields.followUpDate}/>
                <TextField
                    style={style.textField}
                    floatingLabelText={sectionLabels.fields.followUpDetails}
                    floatingLabelStyle={style.floatingLabelText}
                    fullWidth={true}
                    multiLine={true}
                    rowsMax = {4}
                />
            </SectionBase>
        );
    }
}

export default LectureDetailsSection;