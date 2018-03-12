import React from 'react';
import OrderPageTitle from './order-page-title';
import OrderActionButtons from './action-buttons/index';
import OrganizationSection from "./sections/OrganizationSection/OrganizationSectionContainer";
import LectureDetailsSection from "./sections/LectureDetailsSections/LecturesDetailsSectionContainer";
import ContactsSection from "./sections/ContactSection/ContactSectionContainer";
import FollowUpSection from "./sections/FollowUp/FollowUpSectionContainer";
import PaymentSection from "./sections/Payment/PaymentSectionContainer";
import InvoiceSection from "./sections/InvoiceSection/InvoiceSectionContainer";
import NotesSection from "./sections/Notes/NotesSectionContainer";
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

                <InvoiceSection/>

                <NotesSection/>
            </div>
        );
    }
}
