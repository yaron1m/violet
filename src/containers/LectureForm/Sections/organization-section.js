import React from 'react';
import CustomPage from "../../../components/custom-components/custom-page";
import {CustomText} from "../../../components/custom-components/custom-text-field";
import {connect} from 'react-redux';

class OrganizationSection extends React.Component {

    render() {
        const fieldData = {
            titles: this.props.labels.titles,
            values: this.props.organizations.selected
        };

        return (
            <CustomPage title={this.props.labels.sectionName}>
                <CustomText data={fieldData} name="name" allowEdit={this.props.allowEdit} />
                <CustomText data={fieldData} name="address" allowEdit={this.props.allowEdit} />
                <CustomText data={fieldData} name="companyId" size="M" allowEdit={this.props.allowEdit} />
                <CustomText data={fieldData} name="howReachedUs" allowEdit={this.props.allowEdit}/>
            </CustomPage>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        labels: state.softwareLabels.orderPage.organizationSection,
        organizations: state.organizations,
        allowEdit: ownProps.allowEdit
    };
}

OrganizationSection.defaultProps = {
    allowEdit: true,
};

export default connect(mapStateToProps)(OrganizationSection);
