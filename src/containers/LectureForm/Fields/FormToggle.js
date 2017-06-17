import React from 'react';
import Toggle from 'material-ui/Toggle';

class FormToggle extends React.Component {

    render() {
        const {title} = this.props;

        const style = {
            toggle: {
                marginBottom: 6,
                marginTop: 6,
            },
            labelStyle: {
                marginRight: 10,
                marginLeft: 50
            },
        };

        return (
            <div>
                <Toggle
                    style={style.toggle}
                    label={title}
                    labelStyle={style.labelStyle}
                    labelPosition="right"
                />
            </div>

        );
    }
}

export default FormToggle;
