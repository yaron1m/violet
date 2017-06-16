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
                maxWidth: 50,
                paddingBottom: 10
            },
            flex: {
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "flex-end"
            }
        };


        return (
            <SectionBase title={sectionLabels.sectionName}>
                <div style={style.flex}>
                    <Toggle
                        //label={sectionLabels.fields.followUpRequired}
                        style={style.toggle}
                    />

                    <FormDatePicker title={sectionLabels.fields.followUpDate}/>
                </div>


                <div>
                    <TextField
                        floatingLabelText={sectionLabels.fields.followUpDetails}
                        floatingLabelStyle={style.floatingLabelText}
                        fullWidth={true}
                        multiLine={true}
                        rowsMax={4}
                    />
                </div>
            </SectionBase>
        );
    }
}

export default LectureDetailsSection;