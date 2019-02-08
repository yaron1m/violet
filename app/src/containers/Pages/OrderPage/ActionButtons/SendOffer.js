import React from 'react';
import SendIcon from '@material-ui/icons/Mail';
import PropTypes from "prop-types";
import {CustomIconButton} from "../../../../Components/CustomComponents/CustomButtons";

export default class SendOfferButton extends React.Component {
    render() {
        return (
            <a href={this.props.orderEmailLink}>
                <CustomIconButton tooltip={this.props.sendLabel}>
                    <SendIcon/>
                </CustomIconButton>
            </a>
        );
    }
}

SendOfferButton.propTypes = {
    sendLabel: PropTypes.string,
    orderEmailLink: PropTypes.string,
};

