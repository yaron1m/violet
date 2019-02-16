import {connect} from 'react-redux';
import {getSelectedPublicCourse} from '../../../../Store/SelectedPublicCourse/Selectors';
import {updateSelectedPublicCourse} from '../../../../Store/SelectedPublicCourse/Actions';
import {getLabels} from '../../../../Store/Labels/Selectors';
import CustomText from '../../../../Components/CustomComponents/CustomTextField';
import CustomToggle from '../../../../Components/CustomComponents/CustomToggle';
import CustomSelectField, {IOption} from '../../../../Components/CustomComponents/CustomSelectField';
import {IDispatch, IState} from '../../../../Interfaces/ReduxInterfaces';
import IPublicCourse, {IPublicCourseLecture} from '../../../../Interfaces/IPublicCourse';
import {Size} from '../../../../Util/Constants/Size';
import {IStringObject} from '../../../../Interfaces/IOrder';

interface PublicCourseCustomFieldsProps {
    name: string;
    size?: Size;
    options?: IOption[];
    updateAction?: (name: string, newValue: any) => void;
    values?: any;
}

function mapStateToProps(state: IState) {
    return {
        titles: getLabels(state).pages.publicCoursePage.fieldTitles,
        values: getSelectedPublicCourse(state),
    };
}

function mapDispatchToProps(dispatch: IDispatch) {
    return {
        updateAction: (key: string, value: string | IPublicCourseLecture[]) => dispatch(updateSelectedPublicCourse(key, value)),
    };
}

function mergeProps(stateProps: {
    titles: IStringObject; values: IPublicCourse;
}, dispatchProps: {
    updateAction: (key: string, value: string | IPublicCourseLecture[]) => void
}, ownProps: PublicCourseCustomFieldsProps) {
    return {
        titles: stateProps.titles,
        values: ownProps.values ? ownProps.values : stateProps.values,
        requiredFields: [],
        updateAction: ownProps.updateAction ? ownProps.updateAction : dispatchProps.updateAction,
        name: ownProps.name,
        size: ownProps.size,
        options: ownProps.options,
    };
}

export const PublicCourseConnectedText = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomText);
// export const PublicCourseConnectedDatePicker = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomDatePicker);
export const PublicCourseConnectedToggle = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomToggle);
// export const PublicCourseConnectedCheckBox = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomCheckbox);
export const PublicCourseConnectedSelectField = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomSelectField);
