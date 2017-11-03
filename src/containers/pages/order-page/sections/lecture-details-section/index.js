import React from 'react';
import CustomPaper from "../../../../../components/custom-components/custom-paper";
import CustomText from "../../../../../components/custom-components/custom-text-field";
import LectureTimesTable from './lecture-times-table';
import CustomToggle, {CustomCheckbox, CustomToggleBox} from "../../../../../components/custom-components/custom-toggle";
import {connect} from 'react-redux';
import {updateSelectedOrder} from "../../../../../store/selected/actions";
import {getLabels} from "../../../../../store/labels/reducer";
import {getSelectedOrder} from "../../../../../store/selected/reducer";
import {getRequiredFields} from "../../../../../store/required-fields/reducer";
import {getCancellationReasons, getRejectionReasons} from "../../../../../store/lists/reducer";
import CustomAutoComplete from "../../../../../components/custom-components/custom-autocomplete";
import {Status} from "../../../../../util/order-status";
import Sizes from "../../../../../util/consts/sizes";

class LectureDetailsSection extends React.Component {

    render() {
        const fieldData = {
            titles: this.props.labels.titles,
            values: this.props.selectedOrder,
            requiredFields: this.props.requiredFields,
            updateAction: function (key, value) {
                this.props.dispatch(updateSelectedOrder(key, value));

                // Allow only one terminating status
                if (value === true && key === Status.rejected)
                    this.props.dispatch(updateSelectedOrder(Status.cancelled, false));
                if (value === true && key === Status.cancelled)
                    this.props.dispatch(updateSelectedOrder(Status.rejected, false));

            }.bind(this)
        };

        return (
            <CustomPaper
                title={this.props.labels.sectionName}
                isOpen={true}
            >

                <div>
                    <CustomText data={fieldData} name="street"/>
                    <CustomText data={fieldData} name="streetNumber" size={Sizes.S}/>
                    <CustomText data={fieldData} name="city"/>
                    <CustomText data={fieldData} name="location" size={Sizes.XL}/>
                    <CustomText data={fieldData} name="audienceType"/>
                    <CustomText data={fieldData} name="daySchedule"/>
                </div>

                <CustomToggleBox>
                    <CustomToggle data={fieldData} name="projector"/>
                    <CustomToggle data={fieldData} name="soundSystem"/>
                    <CustomToggle data={fieldData} name="microphone"/>
                    <CustomToggle data={fieldData} name="parking"/>
                    <CustomToggle data={fieldData} name="orderApproved"/>
                    <CustomToggle data={fieldData} name="sameAudience"/>
                    <CustomCheckbox data={fieldData} name="rejected"/>
                    {this.props.selectedOrder.status === Status.approvedOrder || this.props.selectedOrder.status === Status.isExecuting?
                        <CustomCheckbox data={fieldData} name="cancelled"/> : null}
                </CustomToggleBox>

                {this.props.selectedOrder.rejected ? (
                    <div style={{display: "flex"}}>
                        <CustomAutoComplete
                            data={fieldData}
                            name="rejectionReason"
                            dataSource={this.props.rejectionReasons}
                            size={Sizes.XL}
                        />
                        <CustomText data={fieldData} name="rejectionDetails" fullWidth={true}/>
                    </div> ) : null
                }

                {this.props.selectedOrder.cancelled ? (
                    <div style={{display: "flex"}}>
                        <CustomAutoComplete
                            data={fieldData}
                            name="cancellationReason"
                            dataSource={this.props.cancellationReasons}
                            size={Sizes.XL}
                        />
                        <CustomText data={fieldData} name="cancellationDetails" fullWidth={true}/>

                    </div>) : null}

                <LectureTimesTable/>

            </CustomPaper>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: getLabels(state).pages.orderPage.sections.lectureDetails,
        selectedOrder: getSelectedOrder(state),
        requiredFields: getRequiredFields(state).order,
        rejectionReasons: getRejectionReasons(state),
        cancellationReasons: getCancellationReasons(state),
    };
}

export default connect(mapStateToProps)(LectureDetailsSection);
