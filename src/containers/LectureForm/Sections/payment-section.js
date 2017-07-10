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

        const fieldData = {
            titles: this.props.labels.titles,
            values: {}
        };

        return (
            <CustomCard
                title={this.props.labels.sectionName}
            >
                <div style={style.flex}>
                    <CustomTextField data={fieldData} name="paymentConditions"/>
                    <CustomTextField data={fieldData} name="expectedPayDay"/>
                    <CustomTextField data={fieldData} name="actualPayDay"/>
                    <CustomTextField data={fieldData} name="proformaInvoiceNumber"/>
                    <CustomDatePicker title={this.props.labels.titles.proformaInvoiceDate} size="L"/>
                    <CustomTextField data={fieldData} name="taxInvoiceNumber"/>
                    <CustomDatePicker title={this.props.labels.titles.taxInvoiceDate} size="L"/>
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