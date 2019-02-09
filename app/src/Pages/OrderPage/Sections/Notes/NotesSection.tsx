import React from 'react';
import CustomPaper from "../../../../Components/CustomComponents/CustomPaper";
import {OrderCustomText} from "../ConnectedCustomComponents/OrderCustomFields";

export default function NotesSection(props: { sectionName: string }) {
    return (
        <CustomPaper title={props.sectionName}>
            <OrderCustomText name="notes" fullWidth={true}/>
        </CustomPaper>
    );
}