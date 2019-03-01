import React from "react";
import CustomPaper from "../../../../Components/CustomComponents/CustomPaper";
import ContactRowContainer from "./ContactRowContainer";

export default function ContactsSection(props: { sectionName: string }) {
    return (
        <CustomPaper title={props.sectionName}>
            <ContactRowContainer isFinancialContacts={false}/>
        </CustomPaper>
    );
}
