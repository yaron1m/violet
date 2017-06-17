import React from 'react';
import labels from '../../../lables.json';
import SectionBase from "../SectionBases/PageBase";
import TextField from 'material-ui/TextField';
import {black} from 'material-ui/styles/colors';


class Notes extends React.Component {

    render() {
        const sectionLabels = labels.lectureForm.notesSection;
        const style = {
            textField: {
                marginLeft: 20,
            },
            floatingLabelText: {
                color: black
            }
        };

        return (
            <SectionBase title={sectionLabels.sectionName}>

                <TextField
                    style={style.textField}
                    floatingLabelText={sectionLabels.fields.followUpDetails}
                    floatingLabelStyle={style.floatingLabelText}
                    fullWidth={true}
                    multiLine={true}
                />
            </SectionBase>
        );
    }
}

export default Notes;