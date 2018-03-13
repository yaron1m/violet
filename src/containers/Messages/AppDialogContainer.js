import {connect} from "react-redux";
import {getDialogActions, getDialogContent, getDialogTitle, isDialogOpen} from "../../store/appearance/reducer";
import {closeDialog} from "../../store/appearance/actions";
import CustomDialog from "../../components/custom-components/custom-dialog";

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