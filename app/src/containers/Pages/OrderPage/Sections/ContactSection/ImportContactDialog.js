import React from 'react';
import PropTypes from 'prop-types';
import CustomDialog from "../../../../../components/CustomComponents/CustomDialog";
import CustomTable from "../../../../../components/Table/CustomTable";
import * as _ from 'lodash';
import CustomTableRow from "../../../../../components/Table/CustomTableRow";

export default function ImportContactsDialog(props) {
    return (
        <CustomDialog
            open={props.dialogOpen}
            title={props.dialogTitle}
            onRequestClose={props.onRequestClose}
        >
            {_.isEmpty(props.contacts) ?
                <div>{props.noContactsLabel}</div> :
                <CustomTable headers={props.tableHeaders}>
                    {_.map(props.contacts, (contactDetails, index) => (
                        <CustomTableRow
                            key={index}
                            rowIndex={index}
                            headers={props.tableHeaders}
                            element={contactDetails}
                            onPickButton={props.importContact}
                        />
                    ))}
                </CustomTable>
            }

        </CustomDialog>
    );
}

ImportContactsDialog.propTypes = {
    dialogOpen: PropTypes.bool.isRequired,
    dialogTitle: PropTypes.string,
    noContactsLabel: PropTypes.string,
    contacts: PropTypes.array,
    tableHeaders: PropTypes.array,
    importContact: PropTypes.func,
    onRequestClose: PropTypes.func,
};
