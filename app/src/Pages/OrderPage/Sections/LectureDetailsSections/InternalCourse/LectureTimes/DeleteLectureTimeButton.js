import React from 'react';
import {connect} from 'react-redux';
import {deleteLectureTime} from "../../../../../../Store/SelectedOrder/Actions";
import {CustomIconButton} from "../../../../../../Components/CustomComponents/CustomButtons";
import PropTypes from "prop-types";
import DeleteIcon from '@material-ui/icons/Delete';

function mapStateToProps() {
    return {
        children: <DeleteIcon/>,
        style: {
            marginBottom: 7
        }
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onClick: () => dispatch(deleteLectureTime(ownProps.lectureTimeIndex))
    }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(CustomIconButton);

Container.propTypes = {
    lectureTimeIndex: PropTypes.number.isRequired,
};

export default Container;
