import Dashboard from "./Dashboard";
import {connect} from "react-redux";
import {IState} from "../../Interfaces/ReduxInterfaces";
import {isSuperUser} from "../../Store/Firebase/Selectors";

function mapStateToProps(state: IState) {
    return {
        isSuperUser: isSuperUser(state)
    };
}

export default connect(mapStateToProps)(Dashboard);