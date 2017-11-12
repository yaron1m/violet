import React from 'react';
import PropTypes from 'prop-types';

export class PrintPageTitle extends React.Component {

    render() {
        const style = {
            fontSize: 30,
            textAlign: "center",
            marginBottom: 10,
        };

        return (
            <div style={style}>{this.props.title}</div>
        )
    }
}

PrintPageTitle.propTypes = {
    title: PropTypes.string,
};
