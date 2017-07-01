import React from 'react';
import CustomCard from "../../../components/formFields/custom-card";
import CustomTextField from "../../../components/formFields/custom-text-field";
import {CustomToggle, CustomToggleBox} from "../../../components/formFields/custom-toggle";
import LectureTimes from "../elements/lecture-times-container";
import {connect} from 'react-redux';

class LectureDetailsSection extends React.Component {

    render() {
        return (
            <CustomCard title={this.props.labels.sectionName} isOpen={true}>
                <LectureTimes/>

                <div>
                    <CustomTextField title={this.props.labels.fields.location}/>
                    <CustomTextField title={this.props.labels.fields.floor} size="S"/>
                    <CustomTextField title={this.props.labels.fields.room}/>
                    <CustomTextField title={this.props.labels.fields.audienceType}/>
                    <CustomTextField title={this.props.labels.fields.daySchedule}/>
                </div>

                <CustomToggleBox>
                    <CustomToggle title={this.props.labels.fields.projector}/>
                    <CustomToggle title={this.props.labels.fields.soundSystem}/>
                    <CustomToggle title={this.props.labels.fields.microphone}/>
                    <CustomToggle title={this.props.labels.fields.parking}/>
                    <CustomToggle title={this.props.labels.fields.orderApproved}/>
                    <CustomToggle title={this.props.labels.fields.sameAudience}/>
                </CustomToggleBox>

            </CustomCard>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: state.softwareLabels.lectureForm.lectureDetailsSection,
    };
}
export default connect(mapStateToProps)(LectureDetailsSection);
