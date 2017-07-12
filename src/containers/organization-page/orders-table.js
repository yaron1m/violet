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
import CustomPage from "../../components/formFields/custom-page";

class OrdersTable extends React.Component {

    render() {

        const tempData = {
            0: {
                date: "01/01/17",
                topic: "חשיבה יצירתית",
                status: "הצעת מחיר"
            },
            40: {
                date: "01/01/17",
                topic: "חשיבה יצירתית",
                status: "הזמנה"
            },
            202: {
                date: "01/01/17",
                topic: "מודעות לאיכות",
                status: "ממתין לתשלום"
            },
            13: {
                date: "01/01/17",
                topic: "חשיבה יצירתית",
                status: "שולם"
            },
        };

        return (
            <CustomPage title={this.props.labels.title}>
                <Table>
                    <TableHeader
                        adjustForCheckbox={false}
                        displaySelectAll={false}
                    >

                        <TableRow>
                            {this.props.labels.tableHeaders.map(title =>
                                <TableHeaderColumn>{title}</TableHeaderColumn>)}
                        </TableRow>

                    </TableHeader>

                    <TableBody
                        displayRowCheckbox={false}
                        showRowHover={true}
                    >
                        {
                            Object.keys(tempData).map(
                                orderId =>
                                    <TableRow>
                                        <TableRowColumn>{orderId}</TableRowColumn>
                                        <TableRowColumn>{tempData[orderId].date}</TableRowColumn>
                                        <TableRowColumn>{tempData[orderId].topic}</TableRowColumn>
                                        <TableRowColumn>{tempData[orderId].status}</TableRowColumn>
                                    </TableRow>
                            )
                        }
                    </TableBody>

                </Table>
            </CustomPage>
        );
    }
}


function mapStateToProps(state) {
    return {
        labels: state.softwareLabels.OrganizationPage.ordersTable,
    };
}

export default connect(mapStateToProps)(OrdersTable);
