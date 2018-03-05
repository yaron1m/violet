import React from 'react';
import PropTypes from "prop-types";

export default class AbstractOrderPageSection extends React.Component {
    constructor(props) {
        super();
        this.fieldData = {
            titles: props.titles,
            values: props.values,
            requiredFields: props.requiredFields,
            updateAction: props.updateAction,
        };

        this.flexStyle = {
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "flex-end"
        };
    }

    componentWillReceiveProps(nextProps) {
        this.fieldData = {
            titles: nextProps.titles,
            values: nextProps.values,
            requiredFields: nextProps.requiredFields,
            updateAction: nextProps.updateAction,
        };
    }
}

AbstractOrderPageSection.propTypes = {
    sectionName: PropTypes.string.isRequired,
    titles: PropTypes.object.isRequired,
    values: PropTypes.object.isRequired,
    updateAction: PropTypes.func.isRequired,
    requiredFields: PropTypes.array,
};
