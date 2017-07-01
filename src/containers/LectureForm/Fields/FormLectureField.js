import React from 'react';
import labels from '../../../lables.json';
import FormTextField from "../Fields/FormTextField";
import FormDatePicker from "../Fields/FormDatePicker";
import FormAutocomleteTextField from "./FormAutocompleteTextField";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import PropTypes from 'prop-types';

class FormLectureField extends React.Component {

    render() {
        const sectionLabels = labels.lectureForm.lectureDetailsSection.lectureTimesSection;

        const styles = {
            flex: {
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "flex-end",
                padding: 10,
            },
            removeButton: {
                marginLeft: 20,
            }
        };

        return (
            <div style={styles.flex}>

                <FloatingActionButton
                    //onTouchTap = {this.prop.removeLectureTime}
                    mini={true}
                    secondary={true}
                    style={styles.removeButton}
                >
                    <ContentRemove />
                </FloatingActionButton>

                <FormDatePicker title={sectionLabels.fields.date}/>
                <FormTextField title={sectionLabels.fields.startTime} size="M"/>
                <FormTextField title={sectionLabels.fields.endTime} size="M"/>
                <FormTextField title={sectionLabels.fields.length} size="M"/>
                <FormAutocomleteTextField title={sectionLabels.fields.topic}/>
                <FormTextField title={sectionLabels.fields.audienceSize} size="M"/>
                <FormTextField title={sectionLabels.fields.shirtColor} size="M"/>
                <FormTextField title={sectionLabels.fields.tie} size="M"/>
            </div>
        );
    }
}

FormLectureField.propTypes = {
    index: PropTypes.number,
    disabled: PropTypes.bool,
};


export default FormLectureField;
