import React from 'react';
import {connect} from 'react-redux';
import {clearSelected} from "../../../../store/selected/actions";
import RefreshIcon from '@material-ui/icons/Refresh';
import {CustomIconButton} from "../../../../components/CustomComponents/CustomButtons";

function mapStateToProps() {
    return {
        children: <RefreshIcon/>
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onClick: () => dispatch(clearSelected()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomIconButton);
