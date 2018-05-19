import Divider from 'material-ui/Divider';
import React from "react";
import PropTypes from 'prop-types';

class CustomDivider extends React.Component {
    render() {
        const style = {
            marginTop: 10,
            marginBottom: 10,
            ...this.props.style
        };

        return (
            <Divider style={style}/>
        );
    }
}

CustomDivider.propTypes = {
    style: PropTypes.object,
};

export default CustomDivider;