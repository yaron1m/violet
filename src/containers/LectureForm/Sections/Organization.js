import React from 'react';
import labels from '../../../lables.json';
import PageBase from "../SectionBases/PageBase";
import FormTextField from "../Fields/FormTextField";

class Organization extends React.Component {

    render() {
        const sectionLabels = labels.lectureForm.organizationSection;

        return (
            <PageBase title={sectionLabels.sectionName}>
                <FormTextField title={sectionLabels.fields.name}/>
                <FormTextField title={sectionLabels.fields.address}/>
                <FormTextField title={sectionLabels.fields.companyId} size="M"/>
                <FormTextField title={sectionLabels.fields.howReachedUs}/>
            </PageBase>
        );
    }
}

export default Organization;
