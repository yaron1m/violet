import React from "react";
import CustomPaper from "../../../../Components/CustomComponents/CustomPaper";
import ContactRowContainer from "./ContactRowContainer";

export default function ContactsSection() {
    return (
        <CustomPaper title="איש קשר">
            <ContactRowContainer isFinancialContacts={false}/>
        </CustomPaper>
    );
}
