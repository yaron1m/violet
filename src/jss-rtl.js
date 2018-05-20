import React from 'react';
import {create} from 'jss';
import rtl from 'jss-rtl';
import JssProvider from 'react-jss/lib/JssProvider';
import {createGenerateClassName, jssPreset} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

// Configure JSS
const jss = create({plugins: [...jssPreset().plugins, rtl()]});

// Custom Material-UI class name generator.
const generateClassName = createGenerateClassName();

const provider = function RTL(props) {
    return (
        <JssProvider jss={jss} generateClassName={generateClassName}>
            {props.children}
        </JssProvider>
    );
}

provider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default provider;