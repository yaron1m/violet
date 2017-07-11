import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import PropTypes from 'prop-types';

class CustomAutoCompleteTextField extends React.Component {


    render() {
        const {title, size} = this.props;

        const style = {
            textField: {
                marginLeft: 20,
            },
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

        return (
            <AutoComplete
                style={style.textField}
                floatingLabelText={title}
                floatingLabelFixed={true}
                filter={AutoComplete.fuzzyFilter}
                dataSource={this.props.dataSource}
                multiLine={true}
                rowsMax={4}
            />
        );
    }
}

CustomAutoCompleteTextField.propTypes = {
    dataSource: PropTypes.array,
};


export default CustomAutoCompleteTextField;
