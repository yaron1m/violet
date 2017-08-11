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
        let newLectureTimeIndex = 0;
        let lectureTimes;
        if (_.hasIn(selectedOrder, 'lectureTimes')) {
            lectureTimes = selectedOrder.lectureTimes;
            if (selectedOrder.lectureTimes !== null && !_.isEmpty(lectureTimes))
                newLectureTimeIndex = _.maxBy(lectureTimes, time => time.id).id + 1;
        } else {
            lectureTimes = [];
        }
        lectureTimes[newLectureTimeIndex] = {id: newLectureTimeIndex};
        this.props.dispatch(updateSelectedOrder("lectureTimes", lectureTimes));
    }

    editLectureTime(index) {
        this.setState(Object.assign({}, this.state, {
            dialogOpen: true,
            selectedLectureTimeIndex: index
        }));
    }

    render() {
        return (
            <CustomPaper>
                <CustomTable headers={this.props.labels.tableHeaders}>
                    {
                        _.map(this.props.selectedOrder.lectureTimes, (lectureTime =>
                                <CustomTableRow
                                    key={lectureTime.id}
                                    headerKeys={this.props.labels.tableHeaders.map((header) => (Object.keys(header)[0]))}
                                    element={lectureTime}
                                    onEditButton={this.editLectureTime.bind(this)}
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
    };
}

export default connect(mapStateToProps)(LectureTimesTable);
