import React from "react";
import {ILectureTime} from "@violet/common";
import {calculatePreparationTimes} from "../../../../../../Util/TimeUtil";

export default function PreparationTimes(props: PreparationTimesProps) {
    const preparationTimes = calculatePreparationTimes(props.lectureTime);

    if (!preparationTimes)
        return null;

    return (
        <div style={styles.container}>
            {getField("זמן לקום", preparationTimes.wakeUpTime)}
            {getField("יציאה מהבית", preparationTimes.leaveHomeTime)}
            {getField("הגעה למקום", preparationTimes.arriveTime)}
            {getField("תחילת ההרצאה", preparationTimes.lectureStartTime)}
        </div>
    );
}

const styles = {
    container: {
        display: "flex" as "flex",
        flexWrap: "wrap" as "wrap",
        justifyContent: "flex-end" as "flex-end",
        paddingLeft: 45,
    },
    field: {
        fontSize: 14,
        marginLeft: 10,
    },
    bold: {
        fontWeight: "bold" as "bold"
    }
};

function getField(label: string, value: string) {
    return (
        <div style={styles.field}>
            <span style={styles.bold}>{label}: </span>
            <span>{value}</span>
        </div>
    );
}

interface PreparationTimesProps {
    lectureTime: ILectureTime,
}