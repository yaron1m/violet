import {connect} from 'react-redux';
import {getSelectedOrder} from "../../../../../../../store/selected/reducer";
import LectureTimesDetails from "./LectureTimesDetails";
import _ from "lodash";
import {getOfferedLectures} from "../../../../../../../store/lists/reducer";
import {toSuggestions} from "../../../../../../../components/AutoSuggest";

function getLectureTimeIndexes(lectureTimes) {
    if (!lectureTimes)
        return [];

    // Add index to every lecture time
    lectureTimes = _.map(lectureTimes, (lectureTime, index) => {
        return {
            ...lectureTime,
            index: index
        }
    });

    const sortedLectureTimes = _.sortBy(lectureTimes, x => x.date);

    return _.map(sortedLectureTimes, lectureTime => lectureTime.index);
}

function mapStateToProps(state) {
    return {
        lectureTimesIndexes: getLectureTimeIndexes(getSelectedOrder(state).lectureTimes),
        offeredLectures: toSuggestions(getOfferedLectures(state)),
    };
}

export default connect(mapStateToProps)(LectureTimesDetails);