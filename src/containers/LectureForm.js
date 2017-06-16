import React from 'react';
import labels from '../lables.json';
import {typography} from 'material-ui/styles';
import OrganizationDetailsSection from "./LectureFormSections/OrganizationDetailsSection";
import LectureDetailsSection from "./LectureFormSections/LectureDetailsSection";
import ContactsSection from "./LectureFormSections/ContactsSection";
import FollowUpSection from "./LectureFormSections/FollowUpSection";
import PaymentSection from "./LectureFormSections/PaymentSection";

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
            </div>
        );
    }
}

export default LectureForm;
