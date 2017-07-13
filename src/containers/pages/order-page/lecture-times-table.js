import React from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import {connect} from 'react-redux';

class LectureTimesTable extends React.Component {

    render() {

        const data = this.props.selected.order.lectureTimes ? this.props.selected.order.lectureTimes : {};

        return (
            <Table style={{tableLayout: 'auto'}} fixedHeader={false}>

                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        {this.props.labels.tableHeaders.map((title, index) =>
                            <TableHeaderColumn key={index}>{title}</TableHeaderColumn>)}
                    </TableRow>
                </TableHeader>

                <TableBody showRowHover={true} displayRowCheckbox={false}>
                    {
                        Object.keys(data).map(
                            contactId =>
                                <TableRow key={contactId}>
                                    <TableRowColumn>{data[contactId].date}</TableRowColumn>
                                    <TableRowColumn>{data[contactId].startTime}</TableRowColumn>
                                    <TableRowColumn>{data[contactId].endTime}</TableRowColumn>
                                    <TableRowColumn>{data[contactId].length}</TableRowColumn>
                                    <TableRowColumn>{data[contactId].topic}</TableRowColumn>
                                    <TableRowColumn>{data[contactId].audienceSize}</TableRowColumn>
                                    <TableRowColumn>{data[contactId].shirtColor}</TableRowColumn>
                                    <TableRowColumn>{data[contactId].tie}</TableRowColumn>
                                </TableRow>
                        )
                    }
                </TableBody>

            </Table>
        );
    }
}


function mapStateToProps(state) {
    return {
        labels: state.softwareLabels.orderPage.lectureDetailsSection.lectureTimesSection,
        selected: state.selected,
    };
}

export default connect(mapStateToProps)(LectureTimesTable);
