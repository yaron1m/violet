import React from "react";
import SingleLectureTimeContainer from "./SingleLectureTimeContainer";
import CustomPaper from "../../../../../../Components/CustomComponents/CustomPaper";
import CustomDivider from "../../../../../../Components/CustomComponents/CustomDivider";
import AddLectureTimeButtonContainer from "./AddLectureTimeButtonContainer";

export default function LectureTimesDetails(props: LectureTimesDetails) {
    if (props.lectureTimesIndexes.length === 0)
        return <AddLectureTimeButtonContainer/>;

    return (
        <React.Fragment>
            <AddLectureTimeButtonContainer/>
            <CustomPaper>
                {props.lectureTimesIndexes.map((lectureTimeIndex, order) =>
                    <React.Fragment key={lectureTimeIndex}>
                        <SingleLectureTimeContainer
                            key={lectureTimeIndex}
                            index={order}
                            lectureTimeIndex={lectureTimeIndex}
                        />

                        {order < props.lectureTimesIndexes.length - 1 ? <CustomDivider/> : null}
                    </React.Fragment>
                )}
            </CustomPaper>
        </React.Fragment>
    );
}

interface LectureTimesDetails {
    lectureTimesIndexes: number[];
}
