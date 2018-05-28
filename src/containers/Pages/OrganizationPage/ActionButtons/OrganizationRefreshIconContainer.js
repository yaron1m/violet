import React from 'react';
import {connect} from 'react-redux';
import {clearSelectedOrganization} from "../../../../store/SelectedOrganization/Actions";
import RefreshIcon from '@material-ui/icons/Refresh';
import {CustomIconButton} from "../../../../components/CustomComponents/CustomButtons";

function mapStateToProps() {
    return {
        children: <RefreshIcon/>
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onClick: () => dispatch(clearSelectedOrganization()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomIconButton);
