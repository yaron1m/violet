import React from 'react';
import labels from '../../../lables.json';
import CardBase from "../SectionBases/CardBase";
import Toggle from "material-ui/Toggle";
import FormDatePicker from "../Fields/FormDatePicker";
import TextField from 'material-ui/TextField';
import {black} from 'material-ui/styles/colors';

class FollowUp extends React.Component {

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
            },
            floatingLabelText: {
                color: black
            }
        };


        return (
            <CardBase
                title={sectionLabels.sectionName}
                // isOpen = {} //Base this on the toggle state
            >
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
            </CardBase>
        );
    }
}

export default FollowUp;