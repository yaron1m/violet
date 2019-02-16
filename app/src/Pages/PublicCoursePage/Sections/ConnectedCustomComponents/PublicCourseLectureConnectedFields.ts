import {connect} from 'react-redux';
import {getSelectedPublicCourseLecture} from '../../../../Store/SelectedPublicCourse/Selectors';
import {updatePublicCourseLecture} from '../../../../Store/SelectedPublicCourse/Actions';
import {getLabels} from '../../../../Store/Labels/Selectors';
import CustomText from '../../../../Components/CustomComponents/CustomTextField';
import CustomDatePicker from '../../../../Components/CustomComponents/CustomDatePicker';
import CustomCheckbox from '../../../../Components/CustomComponents/CustomCheckbox';
import CustomAutoComplete from '../../../../Components/CustomComponents/CustomAutoComplete';
import {IDispatch, IState} from '../../../../Interfaces/ReduxInterfaces';
import {Size} from '../../../../Util/Constants/Size';
import {ISuggestion} from '../../../../Components/AutoSuggest';

interface PublicCourseLectureConnectedFieldsProps {
    name: string,
    lectureId: number;
    size?: Size;
    suggestions?: ISuggestion[];
}

function mapStateToProps(state: IState, ownProps: PublicCourseLectureConnectedFieldsProps) {
    return {
        titles: getLabels(state).pages.publicCoursePage.fieldTitles,
        values: getSelectedPublicCourseLecture(state, ownProps.lectureId),
        requiredFields: [],
        name: ownProps.name,
        size: ownProps.size,
        suggestions: ownProps.suggestions,
    };
}

function mapDispatchToProps(dispatch: IDispatch, ownProps: PublicCourseLectureConnectedFieldsProps) {
    return {
        updateAction: (name: string, newValue: any) =>
            dispatch(updatePublicCourseLecture(name, newValue, ownProps.lectureId)),
    };
}

export const PublicCourseLectureConnectedText = connect(mapStateToProps, mapDispatchToProps)(CustomText);
export const PublicCourseLectureConnectedDatePicker = connect(mapStateToProps, mapDispatchToProps)(CustomDatePicker);
// export const PublicCourseLectureConnectedToggle = connect(mapStateToProps, mapDispatchToProps)(CustomToggle);
export const PublicCourseLectureConnectedCheckBox = connect(mapStateToProps, mapDispatchToProps)(CustomCheckbox);
// export const PublicCourseLectureConnectedSelectField = connect(mapStateToProps, mapDispatchToProps)(CustomSelectField);
export const PublicCourseLectureConnectedAutoComplete = connect(mapStateToProps, mapDispatchToProps)(CustomAutoComplete);
