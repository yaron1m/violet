import LeftIcons from './LeftIcons';
import {connect} from "react-redux";
import {signOutRequest} from "../../../store/Firebase/Actions";
import {getLabels} from "../../../store/Labels/Selectors";
import {getActionRequiredOrders} from "../../../store/orders/selectors";

function mapStateToProps(state) {
    return {
        logOutLabel: getLabels(state).header.logOut,
        notificationCount: getActionRequiredOrders(state).length,
        isProduction: process.env.NODE_ENV === "production",
    };
}

function mapDispatchToProps(dispatch) {
    return {
        signOut: () => dispatch(signOutRequest()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftIcons);
