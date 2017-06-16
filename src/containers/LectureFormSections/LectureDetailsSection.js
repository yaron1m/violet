import React, {PropTypes} from 'react';
import labels from '../../lables.json';
import SectionBase from "./SectionBase";
import FormTextField from "../LectureFormFields/FormTextField";
import FormToggle from "../LectureFormFields/FormToggle";

class LectureDetailsSection extends React.Component {

    render() {
        const sectionLabels = labels.lectureForm.lectureDetailsSection;

        return (
            <SectionBase title={sectionLabels.sectionName}>
                <FormTextField title={sectionLabels.fields.location}/>
                <FormTextField title={sectionLabels.fields.floor}/>
                <FormTextField title={sectionLabels.fields.room}/>
                <FormTextField title={sectionLabels.fields.audienceType}/>
                <FormTextField title={sectionLabels.fields.daySchedule}/>
                <FormToggle title={sectionLabels.fields.projector}/>
                <FormToggle title={sectionLabels.fields.soundSystem}/>
                <FormToggle title={sectionLabels.fields.microphone}/>
                <FormToggle title={sectionLabels.fields.parking}/>
                <FormToggle title={sectionLabels.fields.orderApproved}/>
                <FormToggle title={sectionLabels.fields.sameAudience}/>
            </SectionBase>
        );
    }
}

//      "location": "מיקום ההרצאה",
//     "floor": "קומה",
//     "room": "חדר",
//     "audienceType": "קהל היעד",
//     "daySchedule": "מהות היום + לו\"ז",
//     "projector": "מקרן",
//     "soundSystem": "מערכת הגברה",
//     "microphone": "מיקרופון דש",
//     "parking": "חניה",
//     "orderApproved": "הזמנה אושרה",
//     "sameAudience": "קהל יעד זהה"

export default LectureDetailsSection;
