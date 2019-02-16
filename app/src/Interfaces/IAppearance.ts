import React from 'react';

export default interface IAppearance {
    rtl: boolean,
    language: 'he',
    dialog: {
        isOpen: boolean,
        title: string,
        content: string,
        actions?: React.ReactNode[],
    },
    snackbar: {
        isOpen: boolean,
        message: string,
    },
    showRequiredFields: boolean,
}