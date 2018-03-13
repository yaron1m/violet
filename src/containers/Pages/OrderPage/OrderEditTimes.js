import React from 'react';
import PropTypes from 'prop-types';

export default class OrderTimes extends React.Component {

    render() {
        if (!this.props.isSelectedOrder)
            return null;

        const style = {
            fontSize: 16,
            marginBottom: 10,
        };

        return (
            <div style={style}>
                <span>{this.props.createdDateLabel}</span>
                <span>{new Date(this.props.createdDate).toLocaleDateString()}</span>
                <span>  ;  </span>
                <span>{this.props.changedDateLabel}</span>
                <span>{new Date(this.props.changedDate).toLocaleDateString()}</span>
            </div>
        );
    }
}

OrderTimes.propTypes = {
    isSelectedOrder: PropTypes.bool,
    createdDateLabel: PropTypes.string,
    createdDate: PropTypes.string,
    changedDateLabel: PropTypes.string,
    changedDate: PropTypes.string,
};
