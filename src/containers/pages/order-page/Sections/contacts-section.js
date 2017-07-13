import React from 'react';
import CustomCard from "../../../../components/custom-components/custom-card";
import {connect} from 'react-redux';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

class ContactsSection extends React.Component {

    render() {

        const data = this.props.organizations.selected.contacts;

        return (
            <CustomCard title={this.props.labels.sectionName}>
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
            </CustomCard>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: state.softwareLabels.orderPage.contactsSection,
        organizations: state.organizations,
    };
}
export default connect(mapStateToProps)(ContactsSection);


