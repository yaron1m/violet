import React from 'react';
import {connect} from 'react-redux';
import {deleteLectureTime} from "../../../../../../Store/SelectedOrder/Actions";
import {CustomIconButton} from "../../../../../../Components/CustomComponents/CustomButtons";
import DeleteIcon from '@material-ui/icons/Delete';
import {IDispatch} from '../../../../../../Interfaces/ReduxInterfaces';

function mapDispatchToProps(dispatch:IDispatch, ownProps:{lectureTimeIndex: number}) {
    return {
        onClick: () => dispatch(deleteLectureTime(ownProps.lectureTimeIndex)),
        children: <DeleteIcon/>,
        style: {
            marginBottom: 7
        }
    }
}

export default connect(undefined, mapDispatchToProps)(CustomIconButton);