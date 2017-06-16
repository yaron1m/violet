import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import areIntlLocalesSupported from 'intl-locales-supported';
import labels from '../../lables.json';
import {black} from 'material-ui/styles/colors';



class FormDatePicker extends React.Component {

    render() {
        const {title} = this.props;

        const style = {
            textField:{
                marginLeft:20,
            },
            floatingLabelText: {
                color: black
            }
        };

        let DateTimeFormat;

        /**
         * Use the native Intl.DateTimeFormat if available, or a polyfill if not.
         */
        if (areIntlLocalesSupported(['he', 'he-IL'])) {
            DateTimeFormat = global.Intl.DateTimeFormat;
        } else {
            alert("failed");
        }

        return (
            <DatePicker
                hintText={title}
                DateTimeFormat={DateTimeFormat}
                style={style.floatingLabelText}

                okLabel={labels.buttons.ok}
                cancelLabel={labels.buttons.cancel}
                locale="he"
                firstDayOfWeek={0}
                autoOk = {true}
            />

        );
    }
}

export default FormDatePicker;
