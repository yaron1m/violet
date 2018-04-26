import React from 'react';
import PropTypes from 'prop-types';
import {getKey} from "../../OrderPage/Sections/ContactSection/ContactRow";
import {PrintOrderConnectedText} from "./ConnectedCustomComponents/PrintOrderConnectedFields";

export default class ContactsPrintRow extends React.Component {
    render() {
        const isFinancial = this.props.isFinancial;

        return (
            <div>
                <div>
                    {isFinancial ? this.props.financialContactTitle : null}
                </div>

                <PrintOrderConnectedText name={getKey("contactFirstName", isFinancial)}/>
                <PrintOrderConnectedText name={getKey("contactLastName", isFinancial)}/>
                <PrintOrderConnectedText name={getKey("contactJob", isFinancial)}/>
                <PrintOrderConnectedText name={getKey("contactPhone1", isFinancial)}/>
                <PrintOrderConnectedText name={getKey("contactEmail", isFinancial)}/>
                <PrintOrderConnectedText name={getKey("contactPhone2", isFinancial)}/>
                <PrintOrderConnectedText name={getKey("contactPhoneExtension", isFinancial)}/>
                <PrintOrderConnectedText name={getKey("contactFax", isFinancial)}/>
            </div>
        );
    }
}

ContactsPrintRow.propTypes = {
    isFinancial: PropTypes.bool,
    financialContactTitle: PropTypes.string,
};
