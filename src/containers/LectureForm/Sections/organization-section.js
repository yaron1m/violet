import React from 'react';
import CustomPage from "../../../components/formFields/custom-page";
import CustommTextField from "../../../components/formFields/custom-text-field";
import {connect} from 'react-redux';

class OrganizationSection extends React.Component {

    render() {
        return (
            <CustomPage title={this.props.labels.sectionName}>
                <CustommTextField title={this.props.labels.fields.name}/>
                <CustommTextField title={this.props.labels.fields.address}/>
                <CustommTextField title={this.props.labels.fields.companyId} size="M"/>
                <CustommTextField title={this.props.labels.fields.howReachedUs}/>
            </CustomPage>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: state.softwareLabels.lectureForm.organizationSection,
    };
}

export default connect(mapStateToProps)(OrganizationSection);
