import React from 'react';
import labels from '../../../lables.json';
import PageBase from "../SectionBases/PageBase";
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
            <PageBase title={sectionLabels.sectionName}>

                <TextField
                    style={style.textField}
                    floatingLabelText={sectionLabels.fields.notes}
                    floatingLabelStyle={style.floatingLabelText}
                    fullWidth={true}
                    multiLine={true}
                />
            </PageBase>
        );
    }
}

export default Notes;