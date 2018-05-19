import React from 'react';
import CustomPaper from "../../../../../components/custom-components/CustomPaper";
import ContactRowContainer from './ContactRowContainer';
import PropTypes from "prop-types";

export default class ContactsSection extends React.Component {

    render() {
       return (
            <CustomPaper title={this.props.sectionName}>
                <ContactRowContainer isFinancialContacts={false}/>
            </CustomPaper>
        );
    }
}

ContactsSection.propTypes = {
    sectionName: PropTypes.string,
};