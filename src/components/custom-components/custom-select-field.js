import React from 'react';
import PropTypes from 'prop-types';
import * as _ from "lodash";
import Sizes from "../../util/consts/sizes";
import SelectField from 'material-ui/SelectField';
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

    handleChange = (event, key, value) => {
        if (this.props.data.updateAction) {
            this.props.data.updateAction(this.state.name, value);
        } else {
            console.error("No update action to select field - " + this.state.name);
        }
    };

    render() {
        const style = {
            component: {
                marginRight: 20,
                marginBottom: 20,

            },
        };

        switch (this.props.size) {
            case Sizes.S:
                style.component.width = 50;
                break;
            case Sizes.M:
                style.component.width = 100;
                break;
            case Sizes.L:
            default:
                if (this.props.fullWidth)
                    break;
                style.component.width = 150;
                break;
            case Sizes.XL:
                style.component.width = 250;
                break;
        }

        let showError = false;
        if (!this.state.value && !_.isEmpty(this.props.data.requiredFields) && _.includes(this.props.data.requiredFields, this.state.name))
            showError = true;

        return (
            <SelectField
                style={style.component}
                value={this.state.value}
                onChange={this.handleChange}
                floatingLabelText={this.state.title}
                floatingLabelFixed={true}
                errorText={showError ? "שדה חובה" : ""}
            >
                <MenuItem
                    label={this.state.title}
                    value={null}
                />

                {_.map(this.props.options, option =>
                    <MenuItem
                        key={option}
                        value={option}
                        primaryText={option}
                    />
                )}
            </SelectField>
        );
    }
}

CustomDropDownMenu.propTypes = {
    name: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    values: PropTypes.object,
    options: PropTypes.array.isRequired,
};


function validateProps(props) {
    if (!_.has(props.data.titles, props.name))
        throw Error(`AutoComplete field "${props.name}" doesn't have a matching title in data.titles`);

    if (!_.isFunction(props.data.updateAction))
        throw Error(`AutoComplete field "${props.name}" - data.updateAction must be a function`);
}