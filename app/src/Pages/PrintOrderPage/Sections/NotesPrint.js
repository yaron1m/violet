import React from 'react';
import PropTypes from 'prop-types';
import PrintSection from "../../../Components/CustomComponents/OrderPrint/PrintSection";
import {PrintOrderConnectedText} from "./ConnectedCustomComponents/PrintOrderConnectedFields";

export default class NotesPrintSection extends React.Component {

    render() {
        return (
            <PrintSection title={this.props.sectionName}>
                <PrintOrderConnectedText name="notes"/>
            </PrintSection>
        );
    }
}

NotesPrintSection.propTypes = {
    sectionName: PropTypes.string,
};