import React from 'react';
import {typography} from 'material-ui/styles';
import OrganizationSection from "./Sections/organization-section";
import LectureDetailsSection from "./Sections/lecture-details-section";
import ContactsSection from "./Sections/contacts-section";
import FollowUpSection from "./Sections/follow-up-section";
import PaymentSection from "./Sections/payment-section";
import NotesSection from "./Sections/notes-section";
import {connect} from 'react-redux';
import PageTitle from "../../components/page-title";

class OrderForm extends React.Component {

    render() {

        return (
            <div>
                <PageTitle>{this.props.labels.title}</PageTitle>

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
        labels: state.softwareLabels.orderForm,
    };
}

export default connect(mapStateToProps)(OrderForm);
