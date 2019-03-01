import React from "react";
import CustomPaper from "../../../../Components/CustomComponents/CustomPaper";
import {OrderCustomText} from "../ConnectedCustomComponents/OrderCustomFields";

export default function NotesSection() {
    return (
        <CustomPaper title="הערות">
            <OrderCustomText name="notes" title="הערות" fullWidth={true}/>
        </CustomPaper>
    );
}