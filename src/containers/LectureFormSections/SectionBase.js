import React from 'react';
import Paper from 'material-ui/Paper';

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
            }
        };

        return (
            <Paper style={style.paper}>
                <div style={style.pageTitle}>{title}</div>
                {this.props.children}
            </Paper>
        );
    }
}

export default SectionBase;
