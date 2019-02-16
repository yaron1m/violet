import {connect} from 'react-redux';
import {getSelectedOrder} from '../../../../Store/SelectedOrder/Selectors';
import {updateSelectedOrder} from '../../../../Store/SelectedOrder/Actions';
import {getOrderSectionsLabels} from '../../../../Store/Labels/Selectors';
import CustomText from '../../../../Components/CustomComponents/CustomTextField';
import CustomToggle from '../../../../Components/CustomComponents/CustomToggle';
import {getRequiredFieldsObject} from '../../../../Store/Appearance/RequiredFields/RequiredFieldsSelectors';
import {IDispatch, IState} from '../../../../Interfaces/ReduxInterfaces';
import IOrder from '../../../../Interfaces/IOrder';
import {Size} from '../../../../Util/Constants/Size';

function mapStateToProps(state: IState) {
    return {
        titles: getOrderSectionsLabels(state).titles,
        values: getSelectedOrder(state),
        requiredFields: getRequiredFieldsObject(state).internalOrder,
    };
}

function mapDispatchToProps(dispatch: IDispatch) {
    return {
        updateAction: (key: string, value: any) => dispatch(updateSelectedOrder(key, value)),
    };
}

function mergeProps(stateProps: {
    titles: any; values: IOrder; requiredFields: string[];
}, dispatchProps: {
    updateAction: (key: string, value: any) => void;
}, ownProps: {
    name: string; size?: Size;
}) {
    return {
        titles: stateProps.titles,
        values: stateProps.values,
        requiredFields: stateProps.requiredFields,
        updateAction: dispatchProps.updateAction,
        name: ownProps.name,
        size: ownProps.size,
    };
}

export const InternalOrderCustomText = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomText);
export const InternalOrderCustomToggle = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomToggle);
