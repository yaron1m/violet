import React from 'react';
import {CustomText} from "../../../components/custom-components/custom-text-field";
import {Checkbox} from "material-ui";
import {connect} from 'react-redux';

class ContactDetails extends React.Component {

    render() {
        const style = {
            flex: {
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "flex-end",
                padding: 10,
            },
            checkbox: {
                marginBottom: 10,
                maxWidth: 50
            },
        };

        const fieldData = {
            titles: this.props.labels.titles,
            values: {}
        };

        return (
            <div style={style.flex}>
                <Checkbox style={style.checkbox}/>
                <CustomText name="firstName" data={fieldData}/>
                <CustomText name="lastName" data={fieldData}/>
                <CustomText name="phone1" data={fieldData} size="M"/>
                <CustomText name="phone2" data={fieldData} size="M"/>
                <CustomText name="phoneExtension" data={fieldData} size="M"/>
                <CustomText name="email" data={fieldData}/>
                <CustomText name="fax" data={fieldData} size="M"/>
                <CustomText name="job" data={fieldData} size="M"/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: state.softwareLabels.orderForm.contactsSection,
        organizations: state.organizations
    };
}

export default connect(mapStateToProps)(ContactDetails);