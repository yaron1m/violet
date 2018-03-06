import React from 'react';
import CustomPaper from "../../../../../components/custom-components/custom-paper";
import PropTypes from "prop-types";
import OrderCustomText from "../ConnectedCustomComponents/OrderCustomText";
import OrderCustomDatePicker from "../ConnectedCustomComponents/OrderCustomDatePicker";
import OrderCustomToggle from "../ConnectedCustomComponents/OrderCustomToggle";

export default class FollowUpSection extends React.Component {

    render() {
        const style = {
            flex: {
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "flex-end"
            },
        };

        return (
            <CustomPaper title={this.props.sectionName}>
                <div style={style.flex}>
                    <OrderCustomToggle name="followUpRequired"/>

                    <OrderCustomDatePicker name="followUpDate" disabled={!this.props.followUpRequired}/>
                </div>


                <div>
                    <OrderCustomText
                        name="followUpDetails"
                        fullWidth={true}
                        disabled={!this.props.followUpRequired}
                    />
                </div>
            </CustomPaper>
        );
    }
}

FollowUpSection.propTypes = {
    sectionName: PropTypes.string.isRequired,
    followUpRequired: PropTypes.bool,
};
