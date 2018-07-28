import React from 'react';
import OrganizationSection from "./OrganizationSection/OrganizationSectionContainer";
import LectureDetailsSection from "./LectureDetailsSections/LecturesDetailsSectionContainer";
import ContactsSection from "./ContactSection/ContactSectionContainer";
import FollowUpSection from "./FollowUp/FollowUpSectionContainer";
import PaymentSection from "./Payment/PaymentSectionContainer";
import InvoiceSection from "./InvoiceSection/InvoiceSectionContainer";
import NotesSection from "./Notes/NotesSectionContainer";

export default class OrderForm extends React.Component {

    render() {
        return (
            <div>
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
