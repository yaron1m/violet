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

class ContactsSection extends React.Component {

    render() {
        const sectionLabels = labels.lectureForm.contactsSection;

        const style = {
            header: {
                displaySelectAll: false,
                marginTop: 20,
            },
            textBox: {
                textAlign: "right !important"
            },
            height: 100
        };

        return (
            <SectionBase title={sectionLabels.sectionName}>
                <Table
                    height={style.height}
                    style={style.textBox}
                >
                    <TableHeader
                        displaySelectAll={style.header.displaySelectAll}>
                        <TableRow>
                            <TableHeaderColumn>{sectionLabels.fields.firstName}</TableHeaderColumn>
                            <TableHeaderColumn>{sectionLabels.fields.lastName}</TableHeaderColumn>
                            <TableHeaderColumn>{sectionLabels.fields.phone1}</TableHeaderColumn>
                            <TableHeaderColumn>{sectionLabels.fields.phone2}</TableHeaderColumn>
                            <TableHeaderColumn>{sectionLabels.fields.phoneExtension}</TableHeaderColumn>
                            <TableHeaderColumn>{sectionLabels.fields.email}</TableHeaderColumn>
                            <TableHeaderColumn>{sectionLabels.fields.fax}</TableHeaderColumn>
                            <TableHeaderColumn>{sectionLabels.fields.job}</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow className="tableRow"
                        >
                            <TableRowColumn >משה</TableRowColumn>
                            <TableRowColumn>כהן</TableRowColumn>
                            <TableRowColumn>03-53532215</TableRowColumn>
                            <TableRowColumn>052-5415049</TableRowColumn>
                            <TableRowColumn>352</TableRowColumn>
                            <TableRowColumn>yaron1m@gmail.com</TableRowColumn>
                            <TableRowColumn>077-2255449</TableRowColumn>
                            <TableRowColumn>מפתח אתרים</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>משה</TableRowColumn>
                            <TableRowColumn>כהן</TableRowColumn>
                            <TableRowColumn>03-53532215</TableRowColumn>
                            <TableRowColumn>052-5415049</TableRowColumn>
                            <TableRowColumn>352</TableRowColumn>
                            <TableRowColumn>yaron1m@gmail.com</TableRowColumn>
                            <TableRowColumn>077-2255449</TableRowColumn>
                            <TableRowColumn>מפתח אתרים</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>משה</TableRowColumn>
                            <TableRowColumn>כהן</TableRowColumn>
                            <TableRowColumn>03-53532215</TableRowColumn>
                            <TableRowColumn>052-5415049</TableRowColumn>
                            <TableRowColumn>352</TableRowColumn>
                            <TableRowColumn>yaron1m@gmail.com</TableRowColumn>
                            <TableRowColumn>077-2255449</TableRowColumn>
                            <TableRowColumn>מפתח אתרים</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>משה</TableRowColumn>
                            <TableRowColumn>כהן</TableRowColumn>
                            <TableRowColumn>03-53532215</TableRowColumn>
                            <TableRowColumn>052-5415049</TableRowColumn>
                            <TableRowColumn>352</TableRowColumn>
                            <TableRowColumn>yaron1m@gmail.com</TableRowColumn>
                            <TableRowColumn>077-2255449</TableRowColumn>
                            <TableRowColumn>מפתח אתרים</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>משה</TableRowColumn>
                            <TableRowColumn>כהן</TableRowColumn>
                            <TableRowColumn>03-53532215</TableRowColumn>
                            <TableRowColumn>052-5415049</TableRowColumn>
                            <TableRowColumn>352</TableRowColumn>
                            <TableRowColumn>yaron1m@gmail.com</TableRowColumn>
                            <TableRowColumn>077-2255449</TableRowColumn>
                            <TableRowColumn>מפתח אתרים</TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>
            </SectionBase>
        );
    }
}

export default ContactsSection;
