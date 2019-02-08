import React from 'react';
import PropTypes from 'prop-types';
import {Sizes} from "../../../../../../../util/Constants/Sizes";
import {OrderCustomSelectField, OrderCustomText} from "../../../ConnectedCustomComponents/OrderCustomFields";

export default class OrderTerminateOption extends React.Component {

    render() {
        if (!this.props.show)
            return null;

        return (
            <div style={{display: "flex"}}>
                <OrderCustomSelectField
                    name={this.props.selectFieldName}
                    options={this.props.options}
                    size={Sizes.XL}
                    updateAction={this.props.updateAction}
                />
                <OrderCustomText name={this.props.detailsFieldName} fullWidth={true}/>
            </div>
        );
    }
}

OrderTerminateOption.propTypes = {
    show: PropTypes.bool.isRequired,
    selectFieldName: PropTypes.string.isRequired,
    detailsFieldName: PropTypes.string.isRequired,
    updateAction: PropTypes.func.isRequired,
    options: PropTypes.array,
};
