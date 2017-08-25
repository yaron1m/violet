import React from 'react';
import OrderPageTitle from './order-page-title';
import OrderActionButtons from './action-buttons/index';
import OrganizationSection from "../organization-page/organization-section";
import LectureDetailsSection from "./sections/lecture-details-section/index";
import ContactsSection from "./sections/contacts-section";
import FollowUpSection from "./sections/follow-up-section";
import PaymentSection from "./sections/payment-section";
import NotesSection from "./sections/notes-section";

export default class OrderForm extends React.Component {

    render() {

        return (
            <div>
                <OrderPageTitle/>
                <OrderActionButtons/>

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
