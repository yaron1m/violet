import React from 'react';
import CustomPaper from "../../../../components/custom-components/custom-paper";
import {connect} from 'react-redux';
import CustomText from "../../../../components/custom-components/custom-text-field";
import CustomDatePicker from "../../../../components/custom-components/custom-date-picker";
import {updateSelectedOrder} from "../../../../store/selected/actions";
import CustomToggle from "../../../../components/custom-components/custom-toggle";
import {getLabels} from "../../../../store/labels/reducer";
import {getSelectedOrder} from "../../../../store/selected/reducer";

class FollowUpSection extends React.Component {

    render() {
        const style = {
            toggle: {
                maxWidth: 50,
                paddingBottom: 10
            },
            flex: {
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "flex-end"
            },
        };

        const fieldData = {
            titles: this.props.labels.titles,
            values: this.props.selectedOrder,
            updateAction : function(key, value){
                this.props.dispatch(updateSelectedOrder(key,value));
            }.bind(this)
        };

        return (
            <CustomPaper
                title={this.props.labels.sectionName}
            >
                <div style={style.flex}>
                    <CustomToggle data={fieldData} name="followUpRequired"/>

                    <CustomDatePicker
                        data={fieldData}
                        name="followUpDate"
                        disabled={!this.props.selectedOrder.followUpRequired}
                    />
                </div>


                <div>
                    <CustomText
                        data={fieldData}
                        name="followUpDetails"
                        fullWidth={true}
                        disabled={!this.props.selectedOrder.followUpRequired}
                    />
                </div>
            </CustomPaper>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: getLabels(state).pages.orderPage.sections.followUp,
        selectedOrder: getSelectedOrder(state)
    };
}
export default connect(mapStateToProps)(FollowUpSection);