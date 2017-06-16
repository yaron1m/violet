import React, {PropTypes} from 'react';
import Paper from 'material-ui/Paper';
import {typography} from 'material-ui/styles';

class SectionBase extends React.Component {

    render() {
        const {title} = this.props;

        const style = {
            paper: {
                padding: 10,
                marginTop: 20,
            },
            pageTitle: {
                fontSize: 24,
                fontWeight: typography.fontWeightLight, //TODO check
                marginBottom: 10
            }
        };

        return (
                <Paper style={style.paper}>
                    <span style={style.pageTitle}>{title}</span>
                    <div>
                        {this.props.children}
                    </div>
                </Paper>
        );
    }
}

export default SectionBase;
