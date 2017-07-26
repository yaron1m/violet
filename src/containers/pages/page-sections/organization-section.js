import React from 'react';
import CustomPage from "../../../components/custom-components/custom-page";
import {CustomText} from "../../../components/custom-components/custom-text-field";
import {connect} from 'react-redux';
import {updateSelectedOrganization} from "../../../store/selected/actions";
import {getLabels} from "../../../store/labels/reducer";
import {getSelectedOrder} from "../../../store/selected/reducer";

class OrganizationSection extends React.Component {

    render() {
        const fieldData = {
            titles: this.props.labels.titles,
            values: this.props.selected.organization,
            updateAction: this.props.allowEdit ? updateSelectedOrganization : null,
            dispatch: this.props.dispatch,
        };

        return (
            <CustomPage title={this.props.labels.sectionName}>
                <CustomText data={fieldData} name="name"/>
                <CustomText data={fieldData} name="address"/>
                <CustomText data={fieldData} name="companyId" size="M"/>
                <CustomText data={fieldData} name="howReachedUs"/>
            </CustomPage>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        labels: getLabels(state).orderPage.organizationSection,
        selected: getSelectedOrder(state),
        allowEdit: ownProps.allowEdit
    };
}

OrganizationSection.defaultProps = {
    allowEdit: true,
};

export default connect(mapStateToProps)(OrganizationSection);
