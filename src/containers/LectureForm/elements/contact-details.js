import React from 'react';
import CustomTextField from "../../../components/formFields/custom-text-field";
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
                <CustomTextField name="firstName" data={fieldData}/>
                <CustomTextField name="lastName" data={fieldData}/>
                <CustomTextField name="phone1" data={fieldData} size="M"/>
                <CustomTextField name="phone2" data={fieldData} size="M"/>
                <CustomTextField name="phoneExtension" data={fieldData} size="M"/>
                <CustomTextField name="email" data={fieldData}/>
                <CustomTextField name="fax" data={fieldData} size="M"/>
                <CustomTextField name="job" data={fieldData} size="M"/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: state.softwareLabels.lectureForm.contactsSection,
        organizations: state.organizations
    };
}

export default connect(mapStateToProps)(ContactDetails);