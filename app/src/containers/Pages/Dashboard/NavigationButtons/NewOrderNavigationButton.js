import {connect} from "react-redux";
import {getLabels} from "../../../../Store/Labels/Selectors";
import {redirect} from "../../../../util/HistoryUtil";
import {clearSelectedOrganization} from "../../../../Store/SelectedOrganization/Actions";
import NavigationButton from "./NavigationButton";
import {clearSelectedOrder} from "../../../../Store/SelectedOrder/Actions";

function mapStateToProps(state) {
    return {
        title: getLabels(state).pages.dashboard.navigationButtons.newOrder,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onClick: () => {
            redirect("/form");
            dispatch(clearSelectedOrder());
            dispatch(clearSelectedOrganization());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationButton);