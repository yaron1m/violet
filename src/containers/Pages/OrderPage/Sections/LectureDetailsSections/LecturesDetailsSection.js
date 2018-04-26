import React from 'react';
import CustomPaper from "../../../../../components/custom-components/custom-paper";
import LectureTimesTable from './LectureTimes/LectureTimesTable';
import {CustomToggleBox} from "../../../../../components/custom-components/custom-toggle";
import Sizes from "../../../../../util/consts/sizes";
import {OrderCustomCheckBox, OrderCustomText, OrderCustomToggle} from "../ConnectedCustomComponents/OrderCustomFields";
import RejectedOrderContainer from "./OrderTerminateOptions/RejectedOrderContainer";
import CancelledOrderContainer from "./OrderTerminateOptions/CancelledOrderContainer";
import LectureTimeEditDialog from "./LectureTimes/LectrueTimesEditDialogContainer";
import PropTypes from "prop-types";

export default class LectureDetailsSection extends React.Component {
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

                    <OrderCustomCheckBox name="rejected"/>

                    {this.props.showCancelledCheckBox ? <OrderCustomCheckBox name="cancelled"/> : null}

                </CustomToggleBox>

                <RejectedOrderContainer/>

                <CancelledOrderContainer/>

                <LectureTimesTable
                    onEditButton={(index) => this.setState(Object.assign({}, this.state, {
                        dialogOpen: true,
                        selectedLectureTimeIndex: index
                    }))}
                />

                <LectureTimeEditDialog
                    dialogOpen={this.state.dialogOpen}
                    lectureTimeIndex={this.state.selectedLectureTimeIndex}
                    onRequestClose={() => this.setState(Object.assign({}, this.state, {
                        dialogOpen: false,
                    }))}
                />

            </CustomPaper>
        );
    }
}


LectureDetailsSection.propTypes = {
    sectionName:  PropTypes.string,
    showCancelledCheckBox:  PropTypes.bool,
};