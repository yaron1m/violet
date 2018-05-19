import React from 'react';
import SendIcon from 'material-ui-icons/Mail';
import PropTypes from "prop-types";
import {CustomIconButton} from "../../../../components/CustomComponents/CustomButtons";

export default class SendOfferButton extends React.Component {
    render() {
        return (
            <span>
                <CustomIconButton tooltip={this.props.sendLabel}>
                    <a href={this.props.orderEmailLink}>
                        <SendIcon/>
                    </a>
                </CustomIconButton>
            </span>
        );
    }
}

SendOfferButton.propTypes = {
    sendLabel: PropTypes.string,
    orderEmailLink: PropTypes.string,
};

