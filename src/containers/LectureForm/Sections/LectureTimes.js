import React from 'react';
import labels from '../../../lables.json';
import Paper from 'material-ui/Paper';
import FormTextField from "../Fields/FormTextField";
import FormDatePicker from "../Fields/FormDatePicker";
import {Divider} from "material-ui";
import {purple100} from "material-ui/styles/colors";

class LectureTimes extends React.Component {

    render() {
        const sectionLabels = labels.lectureForm.lectureDetailsSection.lectureTimesSection;

        const style = {
            paper: {
                //backgroundColor:purple100,
                padding: 10,
            },
            flex: {
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "flex-end"
            },
            divider: {
                marginTop: 10,
            }
        };

        return (
            <Paper
                style={style.paper}
            >
                <div style={style.flex}>
                    <FormDatePicker title={sectionLabels.fields.date}/>
                    <FormTextField title={sectionLabels.fields.startTime} size="M"/>
                    <FormTextField title={sectionLabels.fields.endTime} size="M"/>
                    <FormTextField title={sectionLabels.fields.topic}/>
                    <FormTextField title={sectionLabels.fields.audienceSize} size="M"/>
                    <FormTextField title={sectionLabels.fields.shirtColor} size="M"/>
                    <FormTextField title={sectionLabels.fields.tie} size="M"/>
                </div>

                <Divider style={style.divider}/>
                <div style={style.flex}>
                    <FormDatePicker title={sectionLabels.fields.date}/>
                    <FormTextField title={sectionLabels.fields.startTime} size="M"/>
                    <FormTextField title={sectionLabels.fields.endTime} size="M"/>
                    <FormTextField title={sectionLabels.fields.topic}/>
                    <FormTextField title={sectionLabels.fields.audienceSize} size="M"/>
                    <FormTextField title={sectionLabels.fields.shirtColor} size="M"/>
                    <FormTextField title={sectionLabels.fields.tie} size="M"/>
                </div>
            </Paper>
        );
    }
}

export default LectureTimes;
