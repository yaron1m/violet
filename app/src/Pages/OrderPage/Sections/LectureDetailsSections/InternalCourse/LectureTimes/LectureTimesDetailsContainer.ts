import {connect} from "react-redux";
import {getSelectedOrder} from "../../../../../../Store/SelectedOrder/Selectors";
import LectureTimesDetails from "./LectureTimesDetails";
import _ from "lodash";
import {IState} from "../../../../../../Interfaces/ReduxInterfaces";
import {ILectureTime} from "@violet/common";

function getLectureTimeIndexes(lectureTimes: ILectureTime[]) {
    if (!lectureTimes)
        return [];

    // Add index to every lecture time
    const indexedLectureTimes = _.map(lectureTimes, function (lectureTime, index): ILectureTime & { index: number } {
        return {
            ...lectureTime,
            index: index
        };
    });

    const sortedLectureTimes = _.sortBy(indexedLectureTimes, x => x.date);

    return _.map(sortedLectureTimes, lectureTime => lectureTime.index);
}

function mapStateToProps(state: IState) {
    return {
        lectureTimesIndexes: getLectureTimeIndexes(getSelectedOrder(state).lectureTimes),
    };
}

export default connect(mapStateToProps)(LectureTimesDetails);
