import React from 'react';
import OrderPageTitle from './order-page-title';
import OrderActionButtons from './action-buttons/index';
import OrganizationSection from "../organization-page/organization-section";
import LectureDetailsSection from "./sections/lecture-details-section/index";
import ContactsSection from "./sections/contacts-section/index";
import FollowUpSection from "./sections/follow-up-section";
import PaymentSection from "./sections/payment-section/payment-section";
import NotesSection from "./sections/notes-section";
import OrderTimes from './order-page-footer'

export default class OrderForm extends React.Component {

    render() {

        return (
            <div>
                <OrderPageTitle/>
                <OrderTimes/>

                <OrderActionButtons/>

                <OrganizationSection/>

                <ContactsSection/>

                <LectureDetailsSection/>

                <FollowUpSection/>

                <PaymentSection/>

                <NotesSection/>
            </div>
        );
    }
}
