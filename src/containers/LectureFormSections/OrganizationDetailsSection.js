import React from 'react';
import labels from '../../lables.json';
import SectionBase from "./SectionBase";
import FormTextField from "../LectureFormFields/FormTextField";

class OrganizationDetailsSection extends React.Component {

    render() {
        const sectionLabels = labels.lectureForm.organizationSection;

        return (
            <SectionBase title={sectionLabels.sectionName}>
                <FormTextField title={sectionLabels.fields.name}/>
                <FormTextField title={sectionLabels.fields.address}/>
                <FormTextField title={sectionLabels.fields.companyId} size="M"/>
                <FormTextField title={sectionLabels.fields.howReachedUs}/>
            </SectionBase>
        );
    }
}

export default OrganizationDetailsSection;
