import React from 'react';
import {connect} from 'react-redux';
import LectureTimeEditDialog from "./lecture-time-edit-dialog";
import CustomTable from "../../../../../components/custom-components/custom-table";
import {updateSelectedOrder} from "../../../../../store/selected/actions";
import {getLabels} from "../../../../../store/labels/reducer";
import {getSelectedOrder} from "../../../../../store/selected/reducer";
import * as Immutable from "seamless-immutable";
import CustomTableRow from "../../../../../components/custom-components/custom-table-row";
import * as _ from 'lodash';
import {TableRow, TableRowColumn} from "material-ui/Table";
import CustomPaper from "../../../../../components/custom-components/custom-paper";
import {getMissingFields, getRequiredFields} from "../../../../../store/required-fields/reducer";

class LectureTimesTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
            selectedLectureTimeIndex: null,
        };
    }

    addNewLectureTime() {
        let selectedOrder = Immutable.asMutable(this.props.selectedOrder, {deep: true});
        let lectureTimes = _.hasIn(selectedOrder, 'lectureTimes') ? selectedOrder.lectureTimes : [];
        lectureTimes.push({});

        this.props.dispatch(updateSelectedOrder("lectureTimes", lectureTimes));

        this.editLectureTime.bind(this)(lectureTimes.length - 1);
    }

    editLectureTime(index) {
        this.setState(Object.assign({}, this.state, {
            dialogOpen: true,
            selectedLectureTimeIndex: index
        }));
    }

    deleteLectureTime(index) {
        let lectureTimes = Immutable.asMutable(this.props.selectedOrder.lectureTimes);
        lectureTimes.splice(index, 1);

        this.props.dispatch(updateSelectedOrder("lectureTimes", lectureTimes));
    }


    render() {
        let key = 0;
        return (
            <CustomPaper>
                <CustomTable headers={this.props.labels.tableHeaders}>
                    {

                        _.map(this.props.selectedOrder.lectureTimes, (lectureTime, index) =>(
                                <CustomTableRow
                                    key={key++}
                                    headerKeys={this.props.labels.tableHeaders.map((header) => (Object.keys(header)[0]))}
                                    element={lectureTime}
                                    onEditButton={this.editLectureTime.bind(this)}
                                    onDeleteButton={this.deleteLectureTime.bind(this)}
                                    missingFields={!_.isEmpty(getMissingFields(lectureTime, this.props.requiredFields))}
                                    rowIndex={index}
                                />
                        ))
                    }
                    <TableRow selectable={false}>
                        <TableRowColumn/>
                        <TableRowColumn/>
                        <TableRowColumn/>
                        <TableRowColumn/>
                        <TableRowColumn>
                            <div style={{cursor: "pointer"}} onClick={this.addNewLectureTime.bind(this)}>
                                {this.props.labels.addRow}
                            </div>
                        </TableRowColumn>
                        <TableRowColumn/>
                        <TableRowColumn/>
                        <TableRowColumn/>
                        <TableRowColumn/>

                    </TableRow>
                </CustomTable>

                <LectureTimeEditDialog
                    dialogOpen={this.state.dialogOpen}
                    selectedLectureTimeIndex={this.state.selectedLectureTimeIndex}
                    onRequestClose={() => this.setState(Object.assign({}, this.state, {
                        dialogOpen: false,
                    }))}
                />

            </CustomPaper>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: getLabels(state).orderPage.lectureDetailsSection.lectureTimesSection,
        selectedOrder: getSelectedOrder(state),
        requiredFields: getRequiredFields(state).lectureTimes,
    };
}

export default connect(mapStateToProps)(LectureTimesTable);
