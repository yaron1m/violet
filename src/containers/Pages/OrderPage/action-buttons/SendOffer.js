import React from 'react';
import IconButton from "material-ui/IconButton";
import SendIcon from 'material-ui-icons/Mail';
import PrintOrderButton from "./PrintOrder";
import PropTypes from "prop-types";

export default class SendOfferButton extends React.Component {
    render() {
        return (
            <span>
                <IconButton tooltip={this.props.sendLabel}>
                    <a href={this.props.orderEmailLink}>
                        <SendIcon/>
                    </a>
                </IconButton>
            </span>
        );
    }
}

PrintOrderButton.propTypes = {
    sendLabel: PropTypes.string,
    orderEmailLink: PropTypes.string,
};

