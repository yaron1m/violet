import {connect} from "react-redux";
import OrganizationPrintSection from "./OrganizationPrint";
import {IState} from "../../../Interfaces/ReduxInterfaces";
import {getSelectedOrganization} from "../../../Store/SelectedOrganization/Selectors";

function mapStateToProps(state: IState) {
    return {
        selectedOrganization: getSelectedOrganization(state),
    };
}

export default connect(mapStateToProps)(OrganizationPrintSection);