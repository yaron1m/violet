import React from 'react';
import labels from '../../../lables.json';
import CardBase from "../SectionBases/CardBase";
import FormTextField from "../Fields/FormTextField";
import {FormToggle, FormToggleBox} from "../Fields/FormToggle";
import LectureTimes from "./LectureTimes";

class LectureDetails extends React.Component {

    render() {
        const sectionLabels = labels.lectureForm.lectureDetailsSection;

        return (
            <CardBase title={sectionLabels.sectionName} isOpen={true}>
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

            </CardBase>
        );
    }
}

export default LectureDetails;
