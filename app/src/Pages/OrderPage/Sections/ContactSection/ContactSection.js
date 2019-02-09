import React from 'react';
import CustomPaper from "../../../../Components/CustomComponents/CustomPaper";
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