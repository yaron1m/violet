import React from 'react';
import CustomTextField from "../../../components/formFields/custom-text-field";
import CustomDatePicker from "../../../components/formFields/custom-date-picker";
import CustomAutoCompleteTextField from "../../../components/formFields/custom-autocomplete";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import {connect} from 'react-redux';
import {removeLectureTime} from "../../../actions/index";

class LectureTime extends React.Component {

    removeThisLecture() {
        this.props.dispatch(removeLectureTime(this.props.index));
    }

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

        const lecturesOffered = this.props.offeredLectures.map((lecture) => {
            //if(lecture.isActive) {
            return lecture.name;
            //}
        });

        return (
            <div style={styles.flex} key={this.props.index}>

                <FloatingActionButton
                    onTouchTap={this.removeThisLecture.bind(this)}
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

                <CustomAutoCompleteTextField
                    title={this.props.labels.fields.topic}
                    dataSource={lecturesOffered}
                />

                <CustomTextField title={this.props.labels.fields.audienceSize} size="M"/>
                <CustomTextField title={this.props.labels.fields.shirtColor} size="M"/>
                <CustomTextField title={this.props.labels.fields.tie} size="M"/>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        labels: state.softwareLabels.lectureForm.lectureDetailsSection.lectureTimesSection,
        offeredLectures: state.offeredLectures,
        index: ownProps.index,
    };
}

export default connect(mapStateToProps)(LectureTime);
