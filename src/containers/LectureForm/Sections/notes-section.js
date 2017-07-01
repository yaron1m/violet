import React from 'react';
import CustomPage from "../../../components/formFields/custom-page";
import TextField from 'material-ui/TextField';
import {black} from 'material-ui/styles/colors';
import {connect} from 'react-redux';


class NotesSection extends React.Component {

    render() {
        const style = {
            textField: {
                marginLeft: 20,
            },
            floatingLabelText: {
                color: black
            }
        };

        return (
            <CustomPage title={this.props.labels.sectionName}>

                <TextField
                    style={style.textField}
                    floatingLabelText={this.props.labels.fields.notes}
                    floatingLabelStyle={style.floatingLabelText}
                    fullWidth={true}
                    multiLine={true}
                />
            </CustomPage>
        );
    }
}


function mapStateToProps(state) {
    return {
        labels: state.softwareLabels.lectureForm.notesSection,
    };
}
export default connect(mapStateToProps)(NotesSection);