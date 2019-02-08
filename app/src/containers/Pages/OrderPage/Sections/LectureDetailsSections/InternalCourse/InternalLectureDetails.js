import React from 'react';
import CustomPaper, {flexStyle} from "../../../../../../components/CustomComponents/CustomPaper";
import {Sizes} from "../../../../../../util/Constants/Sizes";
import {OrderCustomCheckBox, OrderCustomToggle} from "../../ConnectedCustomComponents/OrderCustomFields";
import RejectedOrderContainer from "./OrderTerminateOptions/RejectedOrderContainer";
import CancelledOrderContainer from "./OrderTerminateOptions/CancelledOrderContainer";
import Colors from "../../../../../../util/Constants/Colors";
import PropTypes from "prop-types";
import LectureTimesDetailsContainer from "./LectureTimes/LectureTimesDetailsContainer";
import {
    InternalOrderCustomText,
    InternalOrderCustomToggle
} from "../../ConnectedCustomComponents/InternalOrderCustomFields";

export default class InternalLectureDetails extends React.Component {
    constructor() {
        super();
        this.state = {
            dialogOpen: false,
            selectedLectureTimeIndex: null,
        };
    }

    render() {
        return (
            <CustomPaper
                title={this.props.sectionName}
            >

                <div>
                    <InternalOrderCustomText name="street"/>
                    <InternalOrderCustomText name="streetNumber" size={Sizes.S}/>
                    <InternalOrderCustomText name="city"/>
                    <InternalOrderCustomText name="location" size={Sizes.XL}/>
                    <InternalOrderCustomText name="audienceType"/>
                    <InternalOrderCustomText name="daySchedule"/>
                </div>

                <div style={flexStyle}>
                    <InternalOrderCustomToggle name="projector"/>
                    <InternalOrderCustomToggle name="soundSystem"/>
                    <InternalOrderCustomToggle name="microphone"/>
                    <InternalOrderCustomToggle name="parking"/>
                    <OrderCustomToggle name="orderApproved"/>
                    <InternalOrderCustomToggle name="sameAudience"/>

                    <OrderCustomCheckBox name="rejected" checkedColor={Colors.red}/>

                    {this.props.showCancelledCheckBox ?
                        <OrderCustomCheckBox name="cancelled" checkedColor={Colors.red}/> : null}

                </div>

                <RejectedOrderContainer/>

                <CancelledOrderContainer/>

                <LectureTimesDetailsContainer/>
            </CustomPaper>
        );
    }
}

InternalLectureDetails.propTypes = {
    sectionName: PropTypes.string.isRequired,
    showCancelledCheckBox: PropTypes.bool.isRequired,
};
