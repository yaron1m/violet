import React from 'react';
import CustomPaper from "../../../../../components/custom-components/custom-paper";
import {OrderCustomText} from "../ConnectedCustomComponents/OrderCustomFields";
import PropTypes from "prop-types";

export default class NotesSection extends React.Component {

    render() {
        return (
            <CustomPaper title={this.props.sectionName}>
                <OrderCustomText name="notes" fullWidth={true}/>
            </CustomPaper>
        );
    }
}

NotesSection.propTypes = {
    sectionName: PropTypes.string,
};