import React from 'react';
import Paper from 'material-ui/Paper';

class FormToggleBox extends React.Component {

    render() {
        const style = {
            paper: {
                padding: 5,
                marginTop: 20,
                paddingBottom:2,
                maxWidth: 200
            }
        };
        return (
            <Paper style={style.paper}>
                <div>
                    {this.props.children}
                </div>
            </Paper>

        );
    }
}

export default FormToggleBox;
