import React from 'react';
import CustomCard from "../../../../components/custom-components/custom-card";
import CustomText from "../../../../components/custom-components/custom-text-field";
import CustomDatePicker from "../../../../components/custom-components/custom-date-picker";
import {connect} from 'react-redux';
import {updateSelectedOrder} from "../../../../store/selected/actions";
import {getLabels} from "../../../../store/labels/reducer";


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
            values: this.props.selected.order,
            updateAction: updateSelectedOrder,
            dispatch: this.props.dispatch,
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
        labels: getLabels(state).orderPage.paymentSection,
        selected: state.selected,
    };
}

export default connect(mapStateToProps)(OrganizationSection);