import React from 'react';
import OrderPageTitle from './order-page-title';
import OrganizationSection from "../organization-page/organization-section";
import LectureDetailsSection from "./sections/lecture-details-section/lecture-details-section";
import ContactsSection from "./sections/contacts-section";
import FollowUpSection from "./sections/follow-up-section";
import PaymentSection from "./sections/payment-section";
import NotesSection from "./sections/notes-section";

export default class OrderForm extends React.Component {

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
