import {connect} from "react-redux";
import {getSelectedOrder} from "../../../../../../Store/SelectedOrder/Selectors";
import LectureTimesDetails from "./LectureTimesDetails";
import _ from "lodash";
import {getOfferedLectures} from "../../../../../../Store/Lists/Selectors";
import {toSuggestions} from "../../../../../../Components/AutoSuggest";
import {IState} from "../../../../../../Interfaces/ReduxInterfaces";
import {ILectureTime} from "../../../../../../Interfaces/IOrder";

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
        offeredLectures: toSuggestions(getOfferedLectures(state)),
    };
}

export default connect(mapStateToProps)(LectureTimesDetails);
