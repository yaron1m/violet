import {isSuperUser} from "../../../store/Firebase/Reducer";
import Dashboard from "./Dashboard";
import {connect} from "react-redux";

function mapStateToProps(state){
    return {
        isSuperUser: isSuperUser(state)
    }
}

export default connect(mapStateToProps)(Dashboard)