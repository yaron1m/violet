import React from 'react';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';

class CustomPage extends React.Component {

    render() {
        const style = {
            paper: {
                padding: 10,
                marginTop: 20,
            },
            title: {
                fontSize: 24,
            },
            titleButton:{
                paddingRight: 20,
            }
        };

        return (
            <Paper style={style.paper}>
                <span style={style.title}>{this.props.title}</span>
                <span style={style.titleButton}>{this.props.titleButtonCondition ? this.props.titleButton : null}</span>
                <div>
                    {this.props.children}
                </div>
            </Paper>
        );
    }
}

CustomPage.propTypes = {
    title: PropTypes.string.isRequired,
    titleButton: PropTypes.element,
    titleButtonCondition: PropTypes.bool,
};

CustomPage.defaultProps = {
    titleButtonCondition: false,
};

export default CustomPage;
