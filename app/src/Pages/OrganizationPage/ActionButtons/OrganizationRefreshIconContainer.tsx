import React from "react";
import {connect} from 'react-redux';
import {clearSelectedOrganization} from "../../../Store/SelectedOrganization/Actions";
import RefreshIcon from '@material-ui/icons/Refresh';
import {CustomIconButton} from "../../../Components/CustomComponents/CustomButtons";
import {IDispatch} from '../../../Interfaces/ReduxInterfaces';

function mapStateToProps() {
    return {
        children: <RefreshIcon/>,
    };
}

function mapDispatchToProps(dispatch:IDispatch) {
    return {
        onClick: () => dispatch(clearSelectedOrganization()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomIconButton);
