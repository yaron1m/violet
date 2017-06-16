import React from 'react';
import Paper from 'material-ui/Paper';

class FormToggleBox extends React.Component {

    render() {
        const style = {
            paper: {
                padding: 5,
                marginTop: 20,
                paddingBottom: 2,
                display: "inline-flex"
            }, flex: {
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "flex-end"
            }
        };

        return (
            <Paper style={style.paper}>
                <div style={style.flex}>
                    {this.props.children}
                </div>
            </Paper>

        );
    }
}

export default FormToggleBox;
