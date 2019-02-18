import React from "react";
import SingleLectureTime from "./SingleLectureTime";
import CustomPaper from "../../../../../../Components/CustomComponents/CustomPaper";
import CustomDivider from "../../../../../../Components/CustomComponents/CustomDivider";
import AddLectureTimeButtonContainer from "./AddLectureTimeButtonContainer";
import {ISuggestion} from '../../../../../../Components/AutoSuggest';

export default function LectureTimesDetails(props: LectureTimesDetails) {
    if (props.lectureTimesIndexes.length === 0)
        return <AddLectureTimeButtonContainer/>;

    return (
        <React.Fragment>
            <AddLectureTimeButtonContainer/>
            <CustomPaper>
                {props.lectureTimesIndexes.map((lectureTimeIndex, order) =>
                    <React.Fragment key={lectureTimeIndex}>
                        <SingleLectureTime
                            key={lectureTimeIndex}
                            index={order}
                            lectureTimeIndex={lectureTimeIndex}
                            offeredLectures={props.offeredLectures}
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
    offeredLectures: ISuggestion[];
}
