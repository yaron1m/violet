import {connect} from 'react-redux';
import OrderPageTitle from './OrderPageTitle';
import {getOrderPageLabels} from '../../Store/Labels/Selectors';
import {isSelectedOrder} from '../../Store/SelectedOrder/Selectors';
import {getSelectedOrderStatusLabel} from '../../Store/Labels/Selectors';
import {getSelectedOrder} from '../../Store/SelectedOrder/Selectors';
import {IState} from '../../Interfaces/ReduxInterfaces';

function mapStateToProps(state: IState) {
    return {
        statusLabel: getSelectedOrderStatusLabel(state),
        title: isSelectedOrder(state) ?
            getOrderPageLabels(state).title.orderNumberTitle + getSelectedOrder(state).id
            : getOrderPageLabels(state).title.newOrderTitle,
    };
}

export default connect(mapStateToProps)(OrderPageTitle);
