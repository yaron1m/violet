import React from 'react';
import Paper from 'material-ui/Paper';

class PageBase extends React.Component {

    render() {
        const {title} = this.props;

        const style = {
            paper: {
                padding: 10,
                marginTop: 20,
            },
            title: {
                fontSize: 24,
            }
        };

        return (
            <Paper style={style.paper}>
                <div style={style.title}>{title}</div>
                {this.props.children}
            </Paper>
        );
    }
}

export default PageBase;
