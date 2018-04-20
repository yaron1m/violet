import React from 'react';
import CustomDialog from "../../../../../../../components/custom-components/custom-dialog";
import PropTypes from 'prop-types';
import Sizes from "../../../../../../../util/consts/sizes";
import {
    LectureTimesCustomAutoComplete,
    LectureTimesCustomDatePicker,
    LectureTimesCustomText
} from "../../../ConnectedCustomComponents/LectureTimesCustomFields";

export default class LectureTimeEditDialog extends React.Component {
    render() {
        const style = {
            flex: {
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "flex-end"
            }
        };

        const index = this.props.lectureTimeIndex;

        return (
            <CustomDialog
                open={this.props.dialogOpen}
                title={this.props.dialogTitle}
                onRequestClose={this.props.onRequestClose}
            >
                <div style={style.flex}>
                    <LectureTimesCustomDatePicker lectureTimeIndex={index} name="date"/>
                    <LectureTimesCustomAutoComplete lectureTimeIndex={index} name="topic" dataSource={this.props.offeredLectures} size={Sizes.XXL}/>
                    <LectureTimesCustomText lectureTimeIndex={index} name="startTime" size={Sizes.M}/>
                    <LectureTimesCustomText lectureTimeIndex={index} name="endTime" size={Sizes.M}/>
                    <LectureTimesCustomText lectureTimeIndex={index} name="audienceSize" size={Sizes.M}/>
                    <LectureTimesCustomText lectureTimeIndex={index} name="tie" size={Sizes.M}/>
                </div>

            </CustomDialog>
        );
    }
}

LectureTimeEditDialog.propTypes = {
    dialogOpen: PropTypes.bool.isRequired,
    offeredLectures: PropTypes.array,
    lectureTimeIndex: PropTypes.number,
    onRequestClose: PropTypes.func.isRequired,
};

