import React from 'react';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';

class CustomPaper extends React.Component {

    render() {
        const style = {
            paper: {
                padding: 10,
                marginTop: 20,
            },
            title: {
                fontSize: 24,
            },
        };

        return (
            <Paper style={style.paper}>
                {this.props.title ? (<span style={style.title}>{this.props.title}</span>) : null}
                <div>
                    {this.props.children}
                </div>
            </Paper>
        );
    }
}

CustomPaper.propTypes = {
    title: PropTypes.string,
};


export default CustomPaper;
