import React from 'react';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';

class CustomPaper extends React.Component {

    render() {
        const style = {
            paper: {
                padding: 10,
                marginBottom: 20,

                ...this.props.style,
            },
            title: {
                fontSize: 24,
            },
        };

        return (
            <Paper style={style.paper} onClick={this.props.onClick}>
                {this.props.title ? (
                    <div style={style.title}>{this.props.title}</div>
                ) : null}
                {this.props.children}
            </Paper>
        );
    }
}

CustomPaper.propTypes = {
    style: PropTypes.object,
    onClick: PropTypes.func,
    title: PropTypes.string,
    children: PropTypes.node,
};


export default CustomPaper;

export const flexStyle = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-end"
};
