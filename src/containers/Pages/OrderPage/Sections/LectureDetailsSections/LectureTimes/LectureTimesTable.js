import {connect} from 'react-redux';
import {updateSelectedOrder} from "../../../../../../store/selected/actions";
import {getLabels} from "../../../../../../store/labels/reducer";
import CustomPaperTable from "../../../../../../components/tables/CustomPaperTable";
import {getSelectedOrder} from "../../../../../../store/selected/reducer";
import * as _ from "lodash";
import * as Immutable from "seamless-immutable";
import PropTypes from "prop-types";

function addNewLectureTime(selectedOrder, updateSelectedOrder, onEditButton) {
    const thisSelectedOrder = Immutable.asMutable(selectedOrder, {deep: true});
    const lectureTimes = _.hasIn(thisSelectedOrder, 'lectureTimes') ? thisSelectedOrder.lectureTimes : [];
    lectureTimes.push({});

    updateSelectedOrder("lectureTimes", lectureTimes);

    onEditButton(lectureTimes.length - 1);
}

function deleteLectureTime(index, selectedOrder, updateSelectedOrder) {
    const lectureTimes = Immutable.asMutable(selectedOrder.lectureTimes);
    lectureTimes.splice(index, 1);

    updateSelectedOrder("lectureTimes", lectureTimes);
}

function getElements(lectureTimes){
    if(!lectureTimes)
        return [];


    // Add index to every lecture time - for opening the right dialog
    lectureTimes= _.map(lectureTimes, (lectureTime, index) => {
        return {
            ...lectureTime,
            index : index
        }
    });

    return _.sortBy(lectureTimes, x => x.date);
}

function mapStateToProps(state) {
    return {
        tableHeaders: getLabels(state).pages.orderPage.sections.lectureTimes.tableHeaders,
        elements: getElements(getSelectedOrder(state).lectureTimes),

        singleCellRowText: getLabels(state).pages.orderPage.sections.lectureTimes.addRow,
        selectedOrder: getSelectedOrder(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateSelectedOrder: (key, value) => dispatch(updateSelectedOrder(key, value)),
    };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
    return {
        title: null,
        elements: stateProps.elements,
        tableHeaders: stateProps.tableHeaders,
        rowIndexKey: "index",
        singleCellRow: true,
        singleCellRowText: stateProps.singleCellRowText,
        onEditButton: ownProps.onEditButton,
        singleCellRowOnClick: () => addNewLectureTime(stateProps.selectedOrder, dispatchProps.updateSelectedOrder, ownProps.onEditButton),
        onDeleteButton: (index) => deleteLectureTime(index, stateProps.selectedOrder, dispatchProps.updateSelectedOrder),
    }
}

const Component = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomPaperTable);

Component.propTypes = {
    onEditButton: PropTypes.func,
};

export default Component;
