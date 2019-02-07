import React from 'react';
import {create} from 'jss';
import rtl from 'jss-rtl';
// @ts-ignore
import JssProvider from 'react-jss/lib/JssProvider';
import {createGenerateClassName, jssPreset} from '@material-ui/core/styles';

// Configure JSS
// @ts-ignore
const jss = create({plugins: [...jssPreset().plugins, rtl()]});

// Custom Material-UI class name generator.
const generateClassName = createGenerateClassName();

const provider = function RTL(props: {children: React.ReactNode}) {
    return (
        <JssProvider jss={jss} generateClassName={generateClassName}>
            {props.children}
        </JssProvider>
    );
};

export default provider;