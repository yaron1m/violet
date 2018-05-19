import React from 'react';
import PropTypes from 'prop-types';

export default class OrderPageTitle extends React.Component {
//TODO export this to a component
    render() {
        const style = {
            div: {
                fontSize: 24,
                textAlign: "center",
            },
            title: {
                fontWeight: "bold",
            }
        };

        return (
            <div style={style.div}>
                <span style={style.title}>{this.props.title}</span>
                <span>{ " - " + this.props.status}</span>
            </div>
        );
    }
}

OrderPageTitle.propTypes = {
    title: PropTypes.string,
    status: PropTypes.string,
};

