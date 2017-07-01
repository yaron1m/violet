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
                maxWidth:50
            },
        };

        return (
            <div style={style.flex}>
                <Checkbox style={style.checkbox} />
                <CustomTextField title={this.props.labels.firstName}/>
                <CustomTextField title={this.props.labels.lastName}/>
                <CustomTextField title={this.props.labels.phone1} size="M"/>
                <CustomTextField title={this.props.labels.phone2} size="M"/>
                <CustomTextField title={this.props.labels.phoneExtension} size="M"/>
                <CustomTextField title={this.props.labels.email}/>
                <CustomTextField title={this.props.labels.fax} size="M"/>
                <CustomTextField title={this.props.labels.job} size="M"/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: state.softwareLabels.lectureForm.contactsSection.fields,
        organizations: state.organizations
    };
}

export default connect(mapStateToProps)(ContactDetails);