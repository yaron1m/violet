import React from 'react';
import CustomText from "../../../../../components/custom-components/custom-text-field";
import {connect} from 'react-redux';
import Paper from "material-ui/Paper";
import CustomTable from "../../../../../components/custom-components/custom-table";
import {updateSelectedOrder} from "../../../../../store/selected/actions";
import {getLabels} from "../../../../../store/labels/reducer";
import {getSelectedOrder} from "../../../../../store/selected/reducer";
import CustomDialog from "../../../../../components/custom-components/custom-dialog";
import CustomDatePicker from "../../../../../components/custom-components/custom-date-picker";
import * as Immutable from "seamless-immutable";
import {calculateDuration} from "../../../../../util/time-util";
import CustomTableRow from "../../../../../components/custom-components/custom-table-row";
import * as _ from 'lodash';
import {TableRow, TableRowColumn} from "material-ui";

class LectureTimesTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
            selectedLectureTimeIndex: null,
        };
    }

    addNewLectureTime(){
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

    render() {

        function editLectureTime(index) {
            this.setState(Object.assign({}, this.state, {
                dialogOpen: true,
                selectedLectureTimeIndex: index
            }));
        }

        function updateLectureTime(key, value) {
            let lectureTimes = Immutable.asMutable(this.props.selectedOrder.lectureTimes, {deep: true});
            lectureTimes[this.state.selectedLectureTimeIndex][key] = value;
            this.props.dispatch(updateSelectedOrder("lectureTimes", lectureTimes));
        }

        const tableFieldData = {
            titles: this.props.labels.editDialog.titles,
            values: this.state.selectedLectureTimeIndex === null ? null :
                this.props.selectedOrder.lectureTimes[this.state.selectedLectureTimeIndex],
            updateAction: updateLectureTime.bind(this)
        };

        let headerKeys = this.props.labels.tableHeaders.map((header) => (Object.keys(header)[0]));

        return (
            <Paper>
                <CustomTable headers={this.props.labels.tableHeaders}>
                    {
                        _.map(this.props.selectedOrder.lectureTimes, (lectureTime =>
                                <CustomTableRow
                                    key={lectureTime.id}
                                    headerKeys={headerKeys}
                                    element={lectureTime}
                                    onEditButton={editLectureTime.bind(this)}
                                />
                        ))
                    }
                    <TableRow selectable={false}>
                        <TableRowColumn/>
                        <TableRowColumn/>
                        <TableRowColumn/>
                        <TableRowColumn/>
                        <TableRowColumn key="edit">
                            <div onClick={this.addNewLectureTime.bind(this)}>
                                {this.props.labels.addRow}
                            </div>
                            </TableRowColumn>
                        <TableRowColumn/>
                        <TableRowColumn/>
                        <TableRowColumn/>
                        <TableRowColumn/>

                    </TableRow>
                </CustomTable>

                <CustomDialog
                    open={this.state.dialogOpen}
                    title={this.props.labels.editDialog.dialogTitle}
                    onRequestClose={function () {
                        let duration = calculateDuration(this.props.selectedOrder.lectureTimes[this.state.selectedLectureTimeIndex]);
                        if (!duration)
                            duration = "";

                        updateLectureTime.bind(this)("duration", duration);

                        this.setState(Object.assign({}, this.state, {
                            dialogOpen: false,
                            selectedLectureTimeIndex: null,
                        }))
                    }.bind(this)}
                >
                    <CustomDatePicker data={tableFieldData} name="date"/>
                    <CustomText data={tableFieldData} name="startTime"/>
                    <CustomText data={tableFieldData} name="endTime"/>
                    <CustomText data={tableFieldData} name="topic"/>
                    <CustomText data={tableFieldData} name="audienceSize"/>
                    <CustomText data={tableFieldData} name="shirtColor"/>
                    <CustomText data={tableFieldData} name="tie"/>
                </CustomDialog>

            </Paper>
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
