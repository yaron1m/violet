import React from "react";
import OrganizationSection from "./OrganizationSection/OrganizationSectionContainer";
import LectureDetailsSection from "./LectureDetailsSections/LecturesDetailsSectionContainer";
import ContactsSection from "./ContactSection/ContactSection";
import FollowUpSection from "./FollowUp/FollowUpSectionContainer";
import PaymentSection from "./Payment/PaymentSectionContainer";
import InvoiceSection from "./InvoiceSection/InvoiceSection";
import NotesSection from "./Notes/NotesSection";

export default function OrderForm() {
    return (
        <div>
            <OrganizationSection fullDetails={false}/>

            <ContactsSection/>

            <LectureDetailsSection/>

            <FollowUpSection/>

            <PaymentSection/>

            <InvoiceSection/>

            <NotesSection/>
        </div>
    );
}
