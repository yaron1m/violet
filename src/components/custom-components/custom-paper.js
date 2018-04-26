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
                {this.props.title ? (<span style={style.title}>{this.props.title}</span>) : null}
                <div>
                    {this.props.children}
                </div>
            </Paper>
        );
    }
}

CustomPaper.propTypes = {
    style: PropTypes.obj,
    onClick: PropTypes.func,
    title: PropTypes.string,
    children: PropTypes.element,
};


export default CustomPaper;
