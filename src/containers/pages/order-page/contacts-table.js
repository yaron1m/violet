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

class ContactsTable extends React.Component {

    render() {

        const data = this.props.organizations.selected.contacts;

        return (
                <Table>
                    <TableHeader
                        displaySelectAll={false}
                    >

                        <TableRow>
                            {this.props.labels.tableHeaders.map((title, index) =>
                                <TableHeaderColumn key={index}>{title}</TableHeaderColumn>)}
                        </TableRow>

                    </TableHeader>

                    <TableBody
                        showRowHover={true}
                    >
                        {
                            Object.keys(data).map(
                                contactId =>
                                    <TableRow key={contactId}>
                                        <TableRowColumn>{data[contactId].firstName}</TableRowColumn>
                                        <TableRowColumn>{data[contactId].lastName}</TableRowColumn>
                                        <TableRowColumn>{data[contactId].phone1}</TableRowColumn>
                                        <TableRowColumn>{data[contactId].phone2}</TableRowColumn>
                                        <TableRowColumn>{data[contactId].phoneExtension}</TableRowColumn>
                                        <TableRowColumn>{data[contactId].email}</TableRowColumn>
                                        <TableRowColumn>{data[contactId].fax}</TableRowColumn>
                                        <TableRowColumn>{data[contactId].job}</TableRowColumn>
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
        labels: state.softwareLabels.orderPage.contactsSection,
        organizations: state.organizations,
    };
}

export default connect(mapStateToProps)(ContactsTable);
