import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';

export default class PageTitle extends React.Component {

    render() {
        return (
            <Avatar
                disabled={false}
                style={{
                    marginBottom: 15,
                    marginLeft: 15,
                }}

            >
                {this.props.index}
            </Avatar>
        )
    }
}

PageTitle.propTypes = {
    index: PropTypes.number.isRequired,
};