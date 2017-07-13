import React from 'react';
import CustomCard from "../../../../components/custom-components/custom-card";
import {CustomText, CustomDatePicker} from "../../../../components/custom-components/custom-text-field";
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
                    <CustomText data={fieldData} name="paymentConditions"/>
                    <CustomText data={fieldData} name="expectedPayDay"/>
                    <CustomDatePicker data={fieldData} name="actualPayDay"/>
                    <CustomText data={fieldData} name="proformaInvoiceNumber"/>
                    <CustomDatePicker data={fieldData} name="proformaInvoiceDate" size="L"/>
                    <CustomText data={fieldData} name="taxInvoiceNumber"/>
                    <CustomDatePicker data={fieldData} name="taxInvoiceDate" size="L"/>
                </div>


            </CustomCard>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: state.softwareLabels.orderPage.paymentSection,
    };
}

export default connect(mapStateToProps)(OrganizationSection);