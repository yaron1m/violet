import {connect} from "react-redux";
import CustomDialog from "../../Components/CustomComponents/CustomDialog";
import {getDialogActions, getDialogContent, getDialogTitle, isDialogOpen} from "../../Store/Appearance/Selectors";
import {closeDialog} from '../../Store/Appearance/Actions';
import {IDispatch, IState} from '../../Interfaces/ReduxInterfaces';

function mapStateToProps(state: IState) {
    return {
        open: isDialogOpen(state),
        title: getDialogTitle(state),
        children: getDialogContent(state),
        actions: getDialogActions(state),
    };
}

function mapDispatchToProps(dispatch: IDispatch) {
    return {
        onRequestClose: () => dispatch(closeDialog()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomDialog);
