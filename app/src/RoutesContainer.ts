import {isLoggedIn} from "./store/Firebase/Reducer";
import {connect} from "react-redux";
import {isRTL} from "./store/Appearance/Selectors";
import Routes from "./Routes";
import {IState} from "./Interfaces/IState";

function mapStateToProps(state: IState) {
    return {
        isLoggedIn: isLoggedIn(state),
        rtl: isRTL(state),
    };
}

export default connect(mapStateToProps)(Routes);