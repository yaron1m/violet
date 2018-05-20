import React from 'react';
import CustomText from "./CustomTextField";

export default class CustomDatePicker extends React.Component {

    render() {

        //TODO parse date from old format
        return (
            <CustomText
                type="date"
                {...this.props}
            />
        );
    }
}

CustomDatePicker.propTypes = CustomText.propTypes;
