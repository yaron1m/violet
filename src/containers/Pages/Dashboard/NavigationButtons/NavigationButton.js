import React from 'react';
import CustomPaper from "../../../../components/custom-components/custom-paper";
import PropTypes from "prop-types";

export default class NavigationButton extends React.Component {


    render() {
        const style = {
            width: "50%",
            cursor: "pointer",
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",
            marginRight: 20,
        };

        return (
            <CustomPaper style={style} onClick={this.props.onClick}>
                {this.props.title}
            </CustomPaper>
        );
    }
}

NavigationButton.propTypes = {
    title: PropTypes.string,
    onClick: PropTypes.func,
};
