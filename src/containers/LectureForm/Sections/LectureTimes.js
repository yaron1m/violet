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
                //backgroundColor: purple100,
                display: "inline-block",
            },
            flex: {
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "flex-end",
                padding: 10,
            },
            divider: {
                marginTop: 10,
            }
        };

        return (
            <Paper
                style={style.paper}
            >
                <div>
                    <div style={style.flex}>
                        <FormDatePicker title={sectionLabels.fields.date}/>
                        <FormTextField title={sectionLabels.fields.startTime} size="M"/>
                        <FormTextField title={sectionLabels.fields.endTime} size="M"/>
                        <FormTextField title={sectionLabels.fields.topic}/>
                        <FormTextField title={sectionLabels.fields.audienceSize} size="M"/>
                        <FormTextField title={sectionLabels.fields.shirtColor} size="M"/>
                        <FormTextField title={sectionLabels.fields.tie} size="M"/>
                    </div>
                </div>

                <Divider style={style.divider}/>
                <div>
                    <div style={style.flex}>
                        <FormDatePicker title={sectionLabels.fields.date}/>
                        <FormTextField title={sectionLabels.fields.startTime} size="M"/>
                        <FormTextField title={sectionLabels.fields.endTime} size="M"/>
                        <FormTextField title={sectionLabels.fields.topic}/>
                        <FormTextField title={sectionLabels.fields.audienceSize} size="M"/>
                        <FormTextField title={sectionLabels.fields.shirtColor} size="M"/>
                        <FormTextField title={sectionLabels.fields.tie} size="M"/>
                    </div>
                </div>
            </Paper>
        );
    }
}

export default LectureTimes;
