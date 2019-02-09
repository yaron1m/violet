import {connect} from 'react-redux';
import {getSelectedPublicCourse} from "../../../../Store/SelectedPublicCourse/Selectors";
import {updateSelectedPublicCourse} from "../../../../Store/SelectedPublicCourse/Actions";
import {getLabels} from "../../../../Store/Labels/Selectors";
import CustomText from "../../../../Components/CustomComponents/CustomTextField";
import CustomToggle from "../../../../Components/CustomComponents/CustomToggle";
import CustomSelectField, {IOption} from "../../../../Components/CustomComponents/CustomSelectField";
import {IDispatch, IState} from '../../../../Interfaces/ReduxInterfaces';
import IPublicCourse, {IPublicCourseLecture} from '../../../../Interfaces/IPublicCourse';
import {Size} from '../../../../util/Constants/Size';

function mapStateToProps(state: IState) {
    return {
        titles: getLabels(state).pages.publicCoursePage.fieldTitles,
        values: getSelectedPublicCourse(state),
        //requiredFields: getRequiredFieldsObject(state).order,
    };
}

function mapDispatchToProps(dispatch: IDispatch) {
    return {
        updateAction: (key: string, value: string | IPublicCourseLecture[]) => dispatch(updateSelectedPublicCourse(key, value)),
    };
}

function mergeProps(stateProps: {
    titles: { [key: string]: string }; values: IPublicCourse;
}, dispatchProps: {
    updateAction: (key: string, value: string | IPublicCourseLecture[]) => void
}, ownProps: {
    name: string, size?: Size, options?: IOption[]
}) {
    return {
        titles: stateProps.titles,
        values: stateProps.values,
        requiredFields: [],
        updateAction: dispatchProps.updateAction,
        name: ownProps.name,
        size: ownProps.size,
    };
}

export const PublicCourseConnectedText = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomText);
// export const PublicCourseConnectedDatePicker = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomDatePicker);
export const PublicCourseConnectedToggle = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomToggle);
// export const PublicCourseConnectedCheckBox = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomCheckbox);
export const PublicCourseConnectedSelectField = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomSelectField);

