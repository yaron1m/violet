import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getLabels} from "../../../../../store/labels/reducer";
import {getSelectedOrganization} from "../../../../../store/selected/reducer";
import {getRequiredFields} from "../../../../../store/required-fields/reducer";
import CustomDialog from "../../../../../components/custom-components/custom-dialog";
import CustomTable from "../../../../../components/custom-components/custom-table";
import * as _ from 'lodash';
import CustomTableRow from "../../../../../components/custom-components/custom-table-row";

class ImportContactsDialog extends React.Component {
    // constructor(props){
    //     super(props);
    //     this.state={
    //         dialogOpen: this.props.dialogOpen,
    //     }
    // }

    hasContacts(selectedOrganization) {
        const field = selectedOrganization.contacts;
        return field !== undefined &&
            field !== null &&
            !_.isEmpty(field);
    }

    render() {
        // const tableFieldData = {
        //     titles: this.props.labels.titles,
        //     values: this.props.selectedLectureTimeIndex === null || this.props.selectedOrder.lectureTimes === undefined ?
        //         null :
        //         this.props.selectedOrder.lectureTimes[this.props.selectedLectureTimeIndex],
        //     requiredFields: this.props.requiredFields,
        //     updateAction: this.updateLectureTime.bind(this)
        // };


        let key = 0;

        return (
            <CustomDialog
                open={this.props.dialogOpen}
                title={this.props.labels.dialogTitle}
                onRequestClose={this.props.onRequestClose}
            >
                <CustomTable headers={this.props.labels.tableHeaders}>
                    {this.hasContacts(this.props.selectedOrganization) ?
                        _.map(this.props.selectedOrganization.contacts, (contactDetails, index) => (
                            <CustomTableRow
                                key={key++}
                                headerKeys={this.props.labels.tableHeaders.map((header) => (Object.keys(header)[0]))}
                                element={contactDetails}
                                // onEditButton={this.editLectureTime.bind(this)}
                                // onDeleteButton={this.deleteLectureTime.bind(this)}
                                // missingFields={!_.isEmpty(getMissingFields(lectureTime, this.props.requiredFields))}
                                //rowIndex={index}
                            />
                        )) :                        null
                    }

                </CustomTable>

            </CustomDialog>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: getLabels(state).orderPage.contactsSection.importContactsDialog,
        selectedOrganization: getSelectedOrganization(state),
        requiredFields: getRequiredFields(state).order,
    };
}

ImportContactsDialog.propTypes = {
    dialogOpen: PropTypes.bool.isRequired,
    isFinancialContacts: PropTypes.bool,
    onRequestClose: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(ImportContactsDialog);


