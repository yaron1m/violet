import React from 'react';
import labels from '../../../lables.json';
import PageBase from "../SectionBases/PageBase";
import Toggle from "material-ui/Toggle";
import FormDatePicker from "../Fields/FormDatePicker";
import TextField from 'material-ui/TextField';

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
            }
        };


        return (
            <PageBase title={sectionLabels.sectionName}>
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
            </PageBase>
        );
    }
}

export default FollowUp;