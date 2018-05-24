import React from 'react';
import CustomPaper from "../../../../../../components/CustomComponents/CustomPaper";
import {CustomToggleBox} from "../../../../../../components/CustomComponents/CustomToggle";
import Sizes from "../../../../../../util/consts/sizes";
import {
    OrderCustomCheckBox,
    OrderCustomText,
    OrderCustomToggle
} from "../../ConnectedCustomComponents/OrderCustomFields";
import RejectedOrderContainer from "./OrderTerminateOptions/RejectedOrderContainer";
import CancelledOrderContainer from "./OrderTerminateOptions/CancelledOrderContainer";
import Colors from "../../../../../../util/consts/colors";
import PropTypes from "prop-types";
import LectureTimesDetailsContainer from "./LectureTimes/LectureTimesDetailsContainer";

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
                    <OrderCustomText name="street"/>
                    <OrderCustomText name="streetNumber" size={Sizes.S}/>
                    <OrderCustomText name="city"/>
                    <OrderCustomText name="location" size={Sizes.XL}/>
                    <OrderCustomText name="audienceType"/>
                    <OrderCustomText name="daySchedule"/>
                </div>

                <CustomToggleBox>
                    <OrderCustomToggle name="projector"/>
                    <OrderCustomToggle name="soundSystem"/>
                    <OrderCustomToggle name="microphone"/>
                    <OrderCustomToggle name="parking"/>
                    <OrderCustomToggle name="orderApproved"/>
                    <OrderCustomToggle name="sameAudience"/>

                    <OrderCustomCheckBox name="rejected" checkedColor={Colors.red}/>

                    {this.props.showCancelledCheckBox ?
                        <OrderCustomCheckBox name="cancelled" checkedColor={Colors.red}/> : null}

                </CustomToggleBox>

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
