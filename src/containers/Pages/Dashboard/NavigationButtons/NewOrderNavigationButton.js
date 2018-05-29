import {connect} from "react-redux";
import {getLabels} from "../../../../store/labels/reducer";
import {redirect} from "../../../../util/HistoryUtil";
import {clearSelectedOrganization} from "../../../../store/SelectedOrganization/Actions";
import NavigationButton from "./NavigationButton";
import {clearSelectedOrder} from "../../../../store/SelectedOrder/Actions";

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