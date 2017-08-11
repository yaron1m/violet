import React from 'react';
import CustomPaper from "../../../components/custom-components/custom-paper";
import CustomText from "../../../components/custom-components/custom-text-field";
import {connect} from 'react-redux';
import {updateSelectedOrganization} from "../../../store/selected/actions";
import {getLabels} from "../../../store/labels/reducer";
import {getSelectedOrganization} from "../../../store/selected/reducer";
import CustomAutoComplete from "../../../components/custom-components/custom-autocomplete";

class OrganizationSection extends React.Component {

    render() {
        const fieldData = {
            titles: this.props.labels.titles,
            values: this.props.selectedOrganization,
            updateAction: function (key, value) {
                if (this.props.allowEdit)
                    this.props.dispatch(updateSelectedOrganization(key, value));
            }.bind(this)
        };

        const paymentConditions = ["aa", "bb", "cc"];

        return (
            <CustomPaper title={this.props.labels.sectionName}>
                <CustomText data={fieldData} name="name"/>
                <CustomText data={fieldData} name="address"/>
                <CustomText data={fieldData} name="companyId" size="M"/>
                <CustomAutoComplete data={fieldData} name="paymentConditions" dataSource={paymentConditions}/>
                <CustomText data={fieldData} name="howReachedUs"/>
            </CustomPaper>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        labels: getLabels(state).OrganizationPage.organizationSection,
        selectedOrganization: getSelectedOrganization(state),
        allowEdit: ownProps.allowEdit
    };
}

OrganizationSection.defaultProps = {
    allowEdit: true,
};

export default connect(mapStateToProps)(OrganizationSection);
