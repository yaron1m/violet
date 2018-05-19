import React from 'react';
import PropTypes from 'prop-types';
import CustomDialog from "../../../../../components/custom-components/CustomDialog";
import CustomTable from "../../../../../components/tables/CustomTable";
import * as _ from 'lodash';
import CustomTableRow from "../../../../../components/tables/CustomTableRow";

export default class ImportContactsDialog extends React.Component {

    render() {
        return (
            <CustomDialog
                open={this.props.dialogOpen}
                title={this.props.dialogTitle}
                onRequestClose={this.props.onRequestClose}
            >
                <CustomTable headers={this.props.tableHeaders}>
                    {_.isEmpty(this.props.contacts) ? null :
                        _.map(this.props.contacts, (contactDetails, index) => (
                            <CustomTableRow
                                key={index}
                                rowIndex={index}
                                headers={this.props.tableHeaders}
                                element={contactDetails}
                                onPickButton={this.props.importContact}
                            />
                        ))
                    }

                </CustomTable>

            </CustomDialog>
        );
    }
}

ImportContactsDialog.propTypes = {
    dialogOpen: PropTypes.bool.isRequired,
    dialogTitle: PropTypes.string,
    contacts: PropTypes.array,
    tableHeaders: PropTypes.array,
    importContact: PropTypes.func,
    onRequestClose: PropTypes.func,
};
