import React from 'react';
import Toggle from 'material-ui/Toggle';
import {black} from 'material-ui/styles/colors';

class FormToggle extends React.Component {

    render() {
        const {title} = this.props;

        const style = {
            toggleBlock: {
                maxWidth: 250,
            },
            toggle: {
                marginBottom: 6,
                marginTop: 6
            },
            thumbOff: {
                backgroundColor: '#ffcccc',
            },
            trackOff: {
                backgroundColor: '#ff9d9d',
            },
            thumbSwitched: {
                backgroundColor: 'red',
            },
            trackSwitched: {
                backgroundColor: '#ff9d9d',
            },
            labelStyle: {
                color: 'red',
            },
        };

        return (
            <div style={style.toggleBlock}>
                <Toggle
                    label={title}
                    style={style.toggle}
                />
            </div>

        );
    }
}

export default FormToggle;
