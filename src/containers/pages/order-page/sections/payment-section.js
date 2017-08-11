import React from 'react';
import CustomCard from "../../../../components/custom-components/custom-card";
import CustomText from "../../../../components/custom-components/custom-text-field";
import CustomDatePicker from "../../../../components/custom-components/custom-date-picker";
import {connect} from 'react-redux';
import {updateSelectedOrder} from "../../../../store/selected/actions";
import {getLabels} from "../../../../store/labels/reducer";
import Divider from 'material-ui/Divider';


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
            updateAction: function (key, value) {
                this.props.dispatch(updateSelectedOrder(key, value));
            }.bind(this)
        };

        return (
            <CustomCard
                title={this.props.labels.sectionName}
            >
                
                <div style={style.flex}>
                    <CustomText data={fieldData} name="amount"/>
                    <CustomText data={fieldData} name="proformaInvoiceNumber"/>
                    <CustomDatePicker data={fieldData} name="proformaInvoiceDate" size="L"/>
                    <CustomText data={fieldData} name="expectedPayDay"/>
                </div>
                <Divider style={{marginTop: 10, marginBottom: 10}}/>

                <div style={style.flex}>
                    <CustomText data={fieldData} name="taxInvoiceNumber"/>
                    <CustomDatePicker data={fieldData} name="taxInvoiceDate" size="L"/>
                    <CustomText data={fieldData} name="receiptNumber"/>
                    <CustomDatePicker data={fieldData} name="actualPayDay"/>
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