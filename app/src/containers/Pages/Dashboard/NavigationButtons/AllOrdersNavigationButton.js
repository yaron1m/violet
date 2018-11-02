import {connect} from "react-redux";
import {getLabels} from "../../../../store/Labels/Selectors";
import {redirect} from "../../../../util/HistoryUtil";
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