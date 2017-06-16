import React from 'react';
import labels from '../../lables.json';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import SectionBase from "./SectionBase";

class LectureTimes extends React.Component {

    render() {
        const sectionLabels = labels.lectureForm.lectureDetailsSection.lectureTimesSection;

        const style = {
            header: {
                displaySelectAll: false,
                marginTop: 20,
            },
            height: 100,
            table:{
                width:1500
            }
        };

        return (
            <Table>
                <TableHeader
                    displaySelectAll={style.header.displaySelectAll}>
                    <TableRow>
                        <TableHeaderColumn>{sectionLabels.fields.date}</TableHeaderColumn>
                        <TableHeaderColumn>{sectionLabels.fields.startTime}</TableHeaderColumn>
                        <TableHeaderColumn>{sectionLabels.fields.endTime}</TableHeaderColumn>
                        <TableHeaderColumn>{sectionLabels.fields.topic}</TableHeaderColumn>
                        <TableHeaderColumn>{sectionLabels.fields.audienceSize}</TableHeaderColumn>
                        <TableHeaderColumn>{sectionLabels.fields.shirtColor}</TableHeaderColumn>
                        <TableHeaderColumn>{sectionLabels.fields.tie}</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableRowColumn >13.08.1992</TableRowColumn>
                        <TableRowColumn>08:00</TableRowColumn>
                        <TableRowColumn>13:00</TableRowColumn>
                        <TableRowColumn>חשיבה יצירתית</TableRowColumn>
                        <TableRowColumn>352</TableRowColumn>
                        <TableRowColumn>כחולה</TableRowColumn>
                        <TableRowColumn>כבשים</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableRowColumn >13.08.1992</TableRowColumn>
                        <TableRowColumn>08:00</TableRowColumn>
                        <TableRowColumn>13:00</TableRowColumn>
                        <TableRowColumn>חשיבה יצירתית</TableRowColumn>
                        <TableRowColumn>352</TableRowColumn>
                        <TableRowColumn>כחולה</TableRowColumn>
                        <TableRowColumn>כבשים</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableRowColumn >13.08.1992</TableRowColumn>
                        <TableRowColumn>08:00</TableRowColumn>
                        <TableRowColumn>13:00</TableRowColumn>
                        <TableRowColumn>חשיבה יצירתית</TableRowColumn>
                        <TableRowColumn>352</TableRowColumn>
                        <TableRowColumn>כחולה</TableRowColumn>
                        <TableRowColumn>כבשים</TableRowColumn>
                    </TableRow>
                </TableBody>
            </Table>
        );
    }
}

export default LectureTimes;
