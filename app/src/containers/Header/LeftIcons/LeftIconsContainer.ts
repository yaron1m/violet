import LeftIcons from './LeftIcons';
import {connect} from "react-redux";
import {signOutRequest} from "../../../Store/Firebase/Actions";
import {getLabels} from "../../../Store/Labels/Selectors";
import {getActionRequiredOrders} from "../../../Store/Orders/Selectors";
import {IDispatch, IState} from '../../../Interfaces/ReduxInterfaces';

function mapStateToProps(state: IState) {
    return {
        logOutLabel: getLabels(state).header.logOut,
        notificationCount: getActionRequiredOrders(state).length,
        isProduction: process.env.NODE_ENV === "production",
    };
}

function mapDispatchToProps(dispatch: IDispatch) {
    return {
        signOut: () => dispatch(signOutRequest()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftIcons);
