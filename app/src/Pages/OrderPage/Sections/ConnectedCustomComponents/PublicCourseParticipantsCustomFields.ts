import {connect} from 'react-redux';
import {getSelectedOrder} from "../../../../Store/SelectedOrder/Selectors";
import {updatePublicCourseParticipant} from "../../../../Store/SelectedOrder/Actions";
import {getOrderSectionsLabels} from "../../../../Store/Labels/Selectors";
import CustomText from "../../../../Components/CustomComponents/CustomTextField";
import CustomCheckbox from "../../../../Components/CustomComponents/CustomCheckbox";
import {getRequiredFieldsObject} from "../../../../Store/Appearance/RequiredFields/RequiredFieldsSelectors";
import {isRightTabKey} from "../../../../Store/Appearance/RequiredFields/Util";
import {IDispatch, IState} from '../../../../Interfaces/ReduxInterfaces';
import {Size} from '../../../../Util/Constants/Size';
import IOrder, {IPublicCourseParticipant, IStringObject} from '../../../../Interfaces/IOrder';
import {TabKey} from '../../../../Util/Constants/Status';

interface PublicCourseParticipantsCustomFieldsProps {
    name: string;
    participantIndex: number;
    size?: Size;
    updateAction?: (key: string, value: any) => void;
    titles?: IStringObject;
    values?: { [key: string]: any; };
}

function getValues(selectedOrder: IOrder, ownProps: PublicCourseParticipantsCustomFieldsProps): IPublicCourseParticipant {
    if (ownProps.participantIndex === null || selectedOrder.publicCourseParticipants === undefined)
        return {} as IPublicCourseParticipant;

    return selectedOrder.publicCourseParticipants[ownProps.participantIndex];
}

function mapStateToProps(state: IState, ownProps: PublicCourseParticipantsCustomFieldsProps) {
    const selectedOrder = getSelectedOrder(state);
    return {
        titles: getOrderSectionsLabels(state).publicCourse.titles as IStringObject,
        values: getValues(selectedOrder, ownProps),
        requiredFields: isRightTabKey(getSelectedOrder(state), TabKey.publicCourseTabKey) ? getRequiredFieldsObject(state).publicCourse : [],
    };
}

function mapDispatchToProps(dispatch: IDispatch, ownProps: PublicCourseParticipantsCustomFieldsProps) {
    return {
        updateAction: (key: string, value: any) => dispatch(updatePublicCourseParticipant(key, value, ownProps.participantIndex))
    };
}

function mergeProps(stateProps: {
    titles: IStringObject; values: IPublicCourseParticipant; requiredFields: string[];
}, dispatchProps: {
    updateAction: (key: string, value: any) => void;
}, ownProps: PublicCourseParticipantsCustomFieldsProps) {
    return {
        titles: ownProps.titles ? ownProps.titles : stateProps.titles,
        values: ownProps.values ? ownProps.values : stateProps.values,
        requiredFields: stateProps.requiredFields,
        updateAction: ownProps.updateAction ? ownProps.updateAction : dispatchProps.updateAction,
        name: ownProps.name,
        size: ownProps.size,
    };
}

export const PublicCourseParticipantsCustomText = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomText);
export const PublicCourseParticipantsCustomCheckBox = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomCheckbox);

