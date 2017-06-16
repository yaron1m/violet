import React from 'react';
import Toggle from 'material-ui/Toggle';

class FormToggle extends React.Component {

    render() {
        const {title} = this.props;

        const style = {
            toggleBlock: {
                width: 170,
            },
            toggle: {
                marginBottom: 6,
                marginTop: 6,
            },
            labelStyle: {
                marginRight: 10,
            },
        };

        return (
            <div style={style.toggleBlock}>
                <Toggle
                    style={style.toggle}
                    label={title}
                    labelStyle = {style.labelStyle}
                    labelPosition="right"
                />
            </div>

        );
    }
}

export default FormToggle;
