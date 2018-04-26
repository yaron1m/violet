import React from 'react';
import PropTypes from 'prop-types';

export default class PrintSection extends React.Component {

    render() {
        const style = {
            section: {
                border: "2px solid gray",
                padding: 10,
                marginBottom: 10,
            },
            sectionTitle: {
                fontSize: 25,
                marginBottom: 10,
            },
        };

        return (
            <div style={style.section}>
                <div style={style.sectionTitle}>{this.props.title}</div>
                {this.props.children}
            </div>
        )
    }
}

PrintSection.propTypes = {
    title: PropTypes.string,
    children: PropTypes.element,
};