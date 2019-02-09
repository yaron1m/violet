import React from 'react';
import CustomPaper, {flexStyle} from "../../../../Components/CustomComponents/CustomPaper";
import PropTypes from "prop-types";
import {
    OrderCustomDatePicker, OrderCustomText,
    OrderCustomToggle
} from "../ConnectedCustomComponents/OrderCustomFields";

export default class FollowUpSection extends React.Component {

    render() {
        return (
            <CustomPaper title={this.props.sectionName}>
                <div style={flexStyle}>
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
