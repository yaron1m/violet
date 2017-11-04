import React from 'react';
import PropTypes from 'prop-types';
import * as _ from "lodash";
import Sizes from "../../util/consts/sizes";
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

export default class CustomDropDownMenu extends React.Component {
    constructor(props) {
        validateProps(props);

        super(props);
        this.state = {
            name: this.props.name,
            title: this.props.data.titles[this.props.name],
            value: this.props.data.values[this.props.name]
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data.values[this.state.name] === this.state.value)
            return;

        this.setState(Object.assign({}, this.state, {
            value: nextProps.data.values[this.state.name] ? nextProps.data.values[this.state.name] : ""
        }));

    }

    handleChange = (searchText, dataSource, params) => {
        if (this.props.data.updateAction) {
            this.props.data.updateAction(this.state.name, searchText);
        } else {
            console.error("No update action to text field - " + this.state.name);
        }
    };

    render() {
        const style = {
            autoComplete: {
                marginRight: 20,
            },
            textField: {
                verticalAlign: "bottom",
                marginBottom: 10,
            },
        };

        switch (this.props.size) {
            case Sizes.S:
                style.autoComplete.width = 50;
                break;
            case Sizes.M:
                style.autoComplete.width = 100;
                break;
            case Sizes.L:
            default:
                if (this.props.fullWidth)
                    break;
                style.autoComplete.width = 150;
                break;
            case Sizes.XL:
                style.autoComplete.width = 250;
                break;
        }
        style.textField.width = style.autoComplete.width;

        let showError = false;
        if (!this.state.value && !_.isEmpty(this.props.data.requiredFields) && _.includes(this.props.data.requiredFields, this.state.name))
            showError = true;

        return (
            <DropDownMenu
                value={this.state.value}
                onChange={this.handleChange}
            >
                {_.map(this.props.options, option =>
                    <MenuItem
                        // textFieldStyle={style.textField}
                        // floatingLabelText={this.state.title}
                        // floatingLabelFixed={true}
                        key={option}
                        value={option}
                        primaryText={option}
                        // errorText={showError ? "שדה חובה" : ""}

                    />
                )}
            </DropDownMenu>
        );
    }
}

CustomDropDownMenu.propTypes = {
    name: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    values: PropTypes.object,
    options: PropTypes.array.isRequired,
    fullWidth: PropTypes.bool,
    disabled: PropTypes.bool,
    onNewRequest: PropTypes.func,
};


function validateProps(props) {
    if (!_.has(props.data.titles, props.name))
        throw Error(`AutoComplete field "${props.name}" doesn't have a matching title in data.titles`);

    if (!_.isFunction(props.data.updateAction))
        throw Error(`AutoComplete field "${props.name}" - data.updateAction must be a function`);
}