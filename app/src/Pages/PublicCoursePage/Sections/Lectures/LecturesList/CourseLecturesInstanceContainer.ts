import {connect} from 'react-redux';
import CourseLecturesInstance from './CourseLecturesInstance';
import {getOfferedLectures} from '../../../../../Store/Lists/Selectors';
import {toSuggestions} from '../../../../../Components/AutoSuggest';
import {IState} from '../../../../../Interfaces/ReduxInterfaces';

function mapStateToProps(state: IState, ownProps: {lectureId: number, index: number}) {
    return {
        index: ownProps.index,
        lectureId: ownProps.lectureId,
        offeredLectures: toSuggestions(getOfferedLectures(state)),
    };
}

export default connect(mapStateToProps)(CourseLecturesInstance);