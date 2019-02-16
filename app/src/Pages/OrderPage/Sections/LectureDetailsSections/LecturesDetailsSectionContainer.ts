import {connect} from 'react-redux';
import {getLabels} from '../../../../Store/Labels/Selectors';
import LectureDetailsSection from './LecturesDetailsSection';
import {getSelectedOrder} from '../../../../Store/SelectedOrder/Selectors';
import {isEmptyValue} from '../../../../Util/StringUtil';
import {updateSelectedOrder} from '../../../../Store/SelectedOrder/Actions';
import {IDispatch, IState} from '../../../../Interfaces/ReduxInterfaces';
import IOrder from '../../../../Interfaces/IOrder';
import * as React from 'react';
import {TabKey} from '../../../../Util/Constants/Status';

function getSelectedTabKey(order: IOrder) {
    if (isEmptyValue(order, 'lectureDetailsTabKey'))
        return TabKey.internalTabKey;

    return order.lectureDetailsTabKey;
}

function mapStateToProps(state: IState) {
    return {
        selectedTabKey: getSelectedTabKey(getSelectedOrder(state)),
        internalLabel: getLabels(state).orderTypes.internalCourse,
        publicCourseLabel: getLabels(state).orderTypes.publicCourse,
    };
}

function mapDispatchToProps(dispatch: IDispatch) {
    return {
        onTabClick: (event: React.ChangeEvent<{}>, value: any) => dispatch(updateSelectedOrder('lectureDetailsTabKey', value))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LectureDetailsSection);
