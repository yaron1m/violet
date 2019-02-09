import {connect} from "react-redux";
import {getLabels} from "../../../Store/Labels/Selectors";
import {redirect} from "../../../Util/HistoryUtil";
import {clearSelectedOrganization} from "../../../Store/SelectedOrganization/Actions";
import NavigationButton from "./NavigationButton";
import {clearSelectedOrder} from "../../../Store/SelectedOrder/Actions";
import {IDispatch, IState} from '../../../Interfaces/ReduxInterfaces';
import {Path} from '../../Path';

function mapStateToProps(state:IState) {
    return {
        title: getLabels(state).pages.dashboard.navigationButtons.newOrder,
    };
}

function mapDispatchToProps(dispatch:IDispatch) {
    return {
        onClick: () => {
            redirect(Path.form);
            dispatch(clearSelectedOrder());
            dispatch(clearSelectedOrganization());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationButton);