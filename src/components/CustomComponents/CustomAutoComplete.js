import React from 'react';
import PropTypes from 'prop-types';
import AbstractCustomField from "./AbstractCustomField";
import CustomAutoSuggest from "./CustomAutoSuggest";

export default class CustomAutoComplete extends AbstractCustomField {

    render() {
        // const style = {
        //     autoComplete: {
        //         marginRight: 20,
        //         width: this.width,
        //     },
        //     textField: {
        //         verticalAlign: "bottom",
        //         marginBottom: 10,
        //         width: this.width,
        //     },
        // };

        //TODO this is not working yet, therer are problems with the functions
        return (
            <CustomAutoSuggest
                title={this.title}
                value={this.state.value}
                suggestions={this.props.dataSource}
                // handleChange={(searchText) => super.handleChange(searchText)}
                // handleRequest={this.props.onNewRequest ? this.props.onNewRequest : (searchText) => super.handleChange(searchText)}
                multiLine
                rowsMax={4}
                disabled={this.props.disabled}
                fullWidth={this.props.fullWidth}
                error={super.shouldShowError()}

                // style={style.autoComplete}
                // textFieldStyle={style.textField}
            />
        );

    }
}

CustomAutoComplete.propTypes = {
    ...AbstractCustomField.propTypes,
    dataSource: PropTypes.array.isRequired,
    disabled: PropTypes.bool,
    onNewRequest: PropTypes.func,
};

CustomAutoComplete.defaultProps = {
    disabled: false,
    fullWidth: false,
};
