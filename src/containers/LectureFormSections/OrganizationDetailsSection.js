import React, {PropTypes} from 'react';
import labels from '../../lables.json';
import {typography} from 'material-ui/styles';
import SectionBase from "./SectionBase";
import FormTextField from "../LectureFormFields/FormTextField";

class OrganizationDetailsSection extends React.Component {

    render() {
        const sectionLabels = labels.lectureForm.organizationSection;
        const style = {
            pageTitle: {
                fontSize: 24,
                fontWeight: typography.fontWeightLight,
                marginBottom: 20
            }
        };

        return (
            <SectionBase title={sectionLabels.sectionName}>
                <FormTextField title={sectionLabels.fields.name}/>
                <FormTextField title={sectionLabels.fields.address}/>
                <FormTextField title={sectionLabels.fields.companyId}/>
                <FormTextField title={sectionLabels.fields.howReachedUs}/>
            </SectionBase>
        );
    }
}

export default OrganizationDetailsSection;
