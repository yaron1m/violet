import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import {black} from 'material-ui/styles/colors';

class CustomAutoCompleteTextField extends React.Component {


    render() {
        const {title, size} = this.props;

        const style = {
            textField: {
                marginLeft: 20,
            },
            floatingLabelText: {
                color: black
            }
        };

        switch (size) {
            case "S":
                style.textField.width = 50;
                break;
            case "M":
                style.textField.width = 100;
                break;

            default:
                break;
        }

        const dataSource = ["asdasd", "חשיבה יצירתית", "מודעות לאיכות"];

        return (
            <AutoComplete
                style={style.textField}
                floatingLabelText={title}
                floatingLabelStyle={style.floatingLabelText}
                filter={AutoComplete.fuzzyFilter}
                dataSource={dataSource}
            />
        );
    }
}

export default CustomAutoCompleteTextField;
