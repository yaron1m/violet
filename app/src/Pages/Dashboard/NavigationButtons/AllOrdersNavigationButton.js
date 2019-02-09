import {connect} from "react-redux";
import {getLabels} from "../../../../Store/Labels/Selectors";
import {redirect} from "../../../../Util/HistoryUtil";
import NavigationButton from "./NavigationButton";

function mapStateToProps(state) {
    return {
        title: getLabels(state).pages.dashboard.navigationButtons.allOrders,
    };
}

function mapDispatchToProps() {
    return {
        onClick: () => redirect("/allOrders"),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationButton);