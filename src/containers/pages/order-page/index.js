import React from 'react';
import OrderPageTitle from './order-page-title';
import OrganizationSection from "../page-sections/organization-section";
import LectureDetailsSection from "../page-sections/lecture-details-section";
import ContactsSection from "../page-sections/contacts-section";
import FollowUpSection from "../page-sections/follow-up-section";
import PaymentSection from "../page-sections/payment-section";
import NotesSection from "../page-sections/notes-section";
import {connect} from 'react-redux';

class OrderForm extends React.Component {

    render() {

        return (
            <div>
                <OrderPageTitle/>

                <OrganizationSection allowEdit={false}/>

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
    };
}

export default connect(mapStateToProps)(OrderForm);
