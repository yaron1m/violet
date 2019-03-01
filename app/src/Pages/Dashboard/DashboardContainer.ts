import Dashboard from "./Dashboard";
import {connect} from "react-redux";
import {IDispatch, IState} from "../../Interfaces/ReduxInterfaces";
import {isSuperUser} from "../../Store/Firebase/Selectors";
import {clearSelectedOrder} from "../../Store/SelectedOrder/Actions";
import {clearSelectedOrganization} from "../../Store/SelectedOrganization/Actions";
import {clearSelectedPublicCourse} from "../../Store/SelectedPublicCourse/Actions";

function mapStateToProps(state: IState) {
    return {
        isSuperUser: isSuperUser(state)
    };
}

function mapDispatchToProps(dispatch: IDispatch) {
    return {
        clearSelectedOrder: () => dispatch(clearSelectedOrder()),
        clearSelectedOrganization: () => dispatch(clearSelectedOrganization()),
        clearSelectedPublicCourse: () => dispatch(clearSelectedPublicCourse()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);