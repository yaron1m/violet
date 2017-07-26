import React from 'react';
import CustomCard from "../../../components/custom-components/custom-card";
import {connect} from 'react-redux';
import {CustomText, CustomDatePicker} from "../../../components/custom-components/custom-text-field";
import {updateSelectedOrder} from "../../../store/selected/actions";
import CustomToggle from "../../../components/custom-components/custom-toggle";
import {getLabels} from "../../../store/labels/reducer";

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
            values: this.props.selected.order,
            updateAction: updateSelectedOrder,
            dispatch: this.props.dispatch,
        };

        return (
            <CustomCard
                title={this.props.labels.sectionName}
                isOpen = {this.props.selected.order.followUpRequired}
            >
                <div style={style.flex}>
                    <CustomToggle data={fieldData} name="followUpRequired"/>

                    <CustomDatePicker
                        data={fieldData}
                        name="followUpDate"
                        disabled={!this.props.selected.order.followUpRequired}
                    />
                </div>


                <div>
                    <CustomText
                        data={fieldData}
                        name="followUpDetails"
                        fullWidth={true}
                        disabled={!this.props.selected.order.followUpRequired}
                    />
                </div>
            </CustomCard>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: getLabels(state).orderPage.followUpSection,
        selected: state.selected
    };
}
export default connect(mapStateToProps)(FollowUpSection);