import React from 'react';
import CustomTextField from "../../../components/formFields/custom-text-field";
import CustomDatePicker from "../../../components/formFields/custom-date-picker";
import CustomAutoCompleteTextField from "../../../components/formFields/custom-autocomplete";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import {connect} from 'react-redux';

class LectureTime extends React.Component {

    render() {
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

                <CustomDatePicker title={this.props.labels.fields.date}/>
                <CustomTextField title={this.props.labels.fields.startTime} size="M"/>
                <CustomTextField title={this.props.labels.fields.endTime} size="M"/>
                <CustomTextField title={this.props.labels.fields.length} size="M"/>
                <CustomAutoCompleteTextField title={this.props.labels.fields.topic}/>
                <CustomTextField title={this.props.labels.fields.audienceSize} size="M"/>
                <CustomTextField title={this.props.labels.fields.shirtColor} size="M"/>
                <CustomTextField title={this.props.labels.fields.tie} size="M"/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: state.softwareLabels.lectureForm.lectureDetailsSection.lectureTimesSection,
    };
}
export default connect(mapStateToProps)(LectureTime);
