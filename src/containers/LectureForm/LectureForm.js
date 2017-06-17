import React from 'react';
import labels from '../../lables.json';
import {typography} from 'material-ui/styles';
import OrganizationDetailsSection from "./Sections/Organization";
import LectureDetailsSection from "./Sections/LectureDetails";
import ContactsSection from "./Sections/Contacts";
import FollowUpSection from "./Sections/FollowUp";
import PaymentSection from "./Sections/Payment";
import NotesSection from "./Sections/Notes";

class LectureForm extends React.Component {

    render() {

        const style = {
            pageTitle: {
                fontSize: 24,
                fontWeight: typography.fontWeightLight,
                marginBottom: 20
            }
        };

        return (
            <div>
                <span style={style.pageTitle}>{labels.lectureForm.title}</span>

                <OrganizationDetailsSection/>

                <LectureDetailsSection/>

                <ContactsSection/>

                <FollowUpSection/>

                <PaymentSection/>

                <NotesSection/>
            </div>
        );
    }
}

export default LectureForm;
