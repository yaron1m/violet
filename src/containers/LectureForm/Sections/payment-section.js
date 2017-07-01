import React from 'react';
import CustomCard from "../../../components/formFields/custom-card";
import CustomDatePicker from "../../../components/formFields/custom-date-picker";
import CustomTextField from "../../../components/formFields/custom-text-field";
import {connect} from 'react-redux';


class OrganizationSection extends React.Component {

    render() {
        const style = {
            flex: {
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "flex-end"
            }
        };

        return (
            <CustomCard
                title={this.props.labels.sectionName}
            >
                <div style={style.flex}>
                    <CustomTextField title={this.props.labels.fields.paymentConditions}/>
                    <CustomTextField title={this.props.labels.fields.expectedPayDay}/>
                    <CustomTextField title={this.props.labels.fields.actualPayDay}/>
                    <CustomTextField title={this.props.labels.fields.proformaInvoiceNumber}/>
                    <CustomDatePicker title={this.props.labels.fields.proformaInvoiceDate} size="L"/>
                    <CustomTextField title={this.props.labels.fields.taxInvoiceNumber}/>
                    <CustomDatePicker title={this.props.labels.fields.taxInvoiceDate} size="L"/>
                </div>


            </CustomCard>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: state.softwareLabels.lectureForm.paymentSection,
    };
}

export default connect(mapStateToProps)(OrganizationSection);