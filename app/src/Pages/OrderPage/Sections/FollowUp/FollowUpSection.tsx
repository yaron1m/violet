import React from "react";
import CustomPaper, {flexStyle} from "../../../../Components/CustomComponents/CustomPaper";
import {
    OrderCustomDatePicker,
    OrderCustomText,
    OrderCustomToggle
} from "../ConnectedCustomComponents/OrderCustomFields";

export default function FollowUpSection(props: FollowUpSectionProps) {
    return (
        <CustomPaper title="המשך טיפול">
            <div style={flexStyle}>
                <OrderCustomToggle title="נדרש המשך טיפול" name="followUpRequired"/>

                <OrderCustomDatePicker title="תאריך המשך טיפול" name="followUpDate" disabled={!props.followUpRequired}/>
            </div>


            <div>
                <OrderCustomText
                    title="פרטים"
                    name="followUpDetails"
                    fullWidth={true}
                    disabled={!props.followUpRequired}
                />
            </div>
        </CustomPaper>
    );
}

interface FollowUpSectionProps {
    followUpRequired: boolean;
}
