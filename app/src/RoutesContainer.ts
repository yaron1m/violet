import {isLoggedIn} from "./Store/Firebase/Selectors";
import {connect} from "react-redux";
import {isRTL} from "./Store/Appearance/Selectors";
import Routes from "./Routes";
import {IState} from "./Interfaces/ReduxInterfaces";

function mapStateToProps(state: IState) {
    return {
        isLoggedIn: isLoggedIn(state),
        rtl: isRTL(state),
    };
}

export default connect(mapStateToProps)(Routes);