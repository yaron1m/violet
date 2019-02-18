import React from "react";
import CustomPaper, {flexStyle} from "../../../../Components/CustomComponents/CustomPaper";
import {OrderCustomDatePicker, OrderCustomText, OrderCustomToggle} from "../ConnectedCustomComponents/OrderCustomFields";

export default function FollowUpSection(props: FollowUpSectionProps) {
    return (
        <CustomPaper title={props.sectionName}>
            <div style={flexStyle}>
                <OrderCustomToggle name="followUpRequired"/>

                <OrderCustomDatePicker name="followUpDate" disabled={!props.followUpRequired}/>
            </div>


            <div>
                <OrderCustomText
                    name="followUpDetails"
                    fullWidth={true}
                    disabled={!props.followUpRequired}
                />
            </div>
        </CustomPaper>
    );
}

interface FollowUpSectionProps {
    sectionName: string;
    followUpRequired: boolean;
}
