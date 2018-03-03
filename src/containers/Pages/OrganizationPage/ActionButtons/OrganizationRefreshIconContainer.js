import React from 'react';
import {connect} from 'react-redux';
import IconButton from "material-ui/IconButton";
import {clearSelected} from "../../../../store/selected/actions";
import RefreshIcon from 'material-ui-icons/Refresh';

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

export default connect(mapStateToProps, mapDispatchToProps)(IconButton);
