import React from 'react';
import {typography} from 'material-ui/styles';
import OrganizationSection from "./Sections/organization-section";
import LectureDetailsSection from "./Sections/lecture-details-section";
import ContactsSection from "./Sections/contacts-section";
import FollowUpSection from "./Sections/follow-up-section";
import PaymentSection from "./Sections/payment-section";
import NotesSection from "./Sections/notes-section";
import {connect} from 'react-redux';

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
                <span style={style.pageTitle}>{this.props.labels.title}</span>

                <OrganizationSection/>

                <LectureDetailsSection/>

                <ContactsSection/>

                <FollowUpSection/>

                <PaymentSection/>

                <NotesSection/>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        labels: state.softwareLabels.lectureForm,
    };
}

export default connect(mapStateToProps)(LectureForm);
