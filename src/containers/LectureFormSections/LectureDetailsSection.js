import React from 'react';
import labels from '../../lables.json';
import SectionBase from "./SectionBase";
import FormTextField from "../LectureFormFields/FormTextField";
import FormToggle from "../LectureFormFields/FormToggle";
import FormToggleBox from "../LectureFormFields/FormToggleBox";
import LectureTimes from "./LectureTimes";

class LectureDetailsSection extends React.Component {

    render() {
        const sectionLabels = labels.lectureForm.lectureDetailsSection;

        return (
            <SectionBase title={sectionLabels.sectionName}>
                <LectureTimes/>

                <div>
                    <FormTextField title={sectionLabels.fields.location}/>
                    <FormTextField title={sectionLabels.fields.floor} size="S"/>
                    <FormTextField title={sectionLabels.fields.room}/>
                    <FormTextField title={sectionLabels.fields.audienceType}/>
                    <FormTextField title={sectionLabels.fields.daySchedule}/>
                </div>

                <FormToggleBox>
                    <FormToggle title={sectionLabels.fields.projector}/>
                    <FormToggle title={sectionLabels.fields.soundSystem}/>
                    <FormToggle title={sectionLabels.fields.microphone}/>
                    <FormToggle title={sectionLabels.fields.parking}/>
                    <FormToggle title={sectionLabels.fields.orderApproved}/>
                    <FormToggle title={sectionLabels.fields.sameAudience}/>
                </FormToggleBox>

            </SectionBase>
        );
    }
}

export default LectureDetailsSection;
