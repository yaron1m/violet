import {connect} from "react-redux";
import {ILectureTime, IOrder} from "@violet/common";
import {getSelectedOrder} from "../../../../../../Store/SelectedOrder/Selectors";
import SingleLectureTime from "./SingleLectureTime";
import {IDispatch, IState} from "../../../../../../Interfaces/ReduxInterfaces";
import {TabKey} from "../../../../../../Util/Constants/Status";
import {isRightTabKey} from "../../../../../../Store/Appearance/RequiredFields/Util";
import {getRequiredFieldsObject} from "../../../../../../Store/Appearance/RequiredFields/RequiredFieldsSelectors";
import {toSuggestions} from "../../../../../../Components/AutoSuggest";
import {getOfferedLectures} from "../../../../../../Store/Lists/Selectors";
import {updateLectureTime} from "../../../../../../Store/SelectedOrder/Actions";

function getLectureTime(selectedOrder: IOrder, lectureTimeIndex: number): ILectureTime {
    if (lectureTimeIndex === null || selectedOrder.lectureTimes === undefined)
        return {} as ILectureTime;

    return selectedOrder.lectureTimes[lectureTimeIndex];
}

function mapStateToProps(state: IState, ownProps: SingleLectureTimeContainerProps) {
    const selectedOrder = getSelectedOrder(state);

    return {
        lectureTime: getLectureTime(selectedOrder, ownProps.lectureTimeIndex),
        requiredFields: isRightTabKey(selectedOrder, TabKey.internalTabKey, true) ?
            getRequiredFieldsObject(state).lectureTimes : [],
        index: ownProps.index,
        offeredLectures: toSuggestions(getOfferedLectures(state)),
    };
}

function mapDispatchToProps(dispatch: IDispatch, ownProps: SingleLectureTimeContainerProps) {
    return {
        onChange: (key: string) => (newValue: string) => dispatch(updateLectureTime(key, newValue, ownProps.lectureTimeIndex))
    };
}

interface SingleLectureTimeContainerProps {
    lectureTimeIndex: number;
    index: number;
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleLectureTime);