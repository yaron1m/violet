import {connect} from "react-redux";
import {closeDialog} from "../../store/Appearance/Actions";
import CustomDialog from "../../Components/CustomComponents/CustomDialog";
import {getDialogActions, getDialogContent, getDialogTitle, isDialogOpen} from "../../store/Appearance/Selectors";

function mapStateToProps(state) {
    return {
        open: isDialogOpen(state),
        title: getDialogTitle(state),
        children: getDialogContent(state),
        actions: getDialogActions(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onRequestClose: () => dispatch(closeDialog()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomDialog);
