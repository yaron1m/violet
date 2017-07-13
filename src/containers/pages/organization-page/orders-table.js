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
import CustomPage from "../../../components/custom-components/custom-page";
import EditIcon from 'material-ui/svg-icons/image/edit';
import {IconButton} from "material-ui";


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
                            {this.props.labels.tableHeaders.map((title, index) =>
                                <TableHeaderColumn key={index}>{title}</TableHeaderColumn>)}
                        </TableRow>

                    </TableHeader>

                    <TableBody
                        displayRowCheckbox={false}
                        showRowHover={true}
                    >
                        {
                            Object.keys(tempData).map(
                                orderId =>
                                    <TableRow key={orderId} selectable={false}>
                                        <TableRowColumn>{orderId}</TableRowColumn>
                                        <TableRowColumn>{tempData[orderId].date}</TableRowColumn>
                                        <TableRowColumn>{tempData[orderId].topic}</TableRowColumn>
                                        <TableRowColumn>{tempData[orderId].status}</TableRowColumn>
                                        <TableRowColumn>
                                            <IconButton>
                                                <EditIcon/>
                                            </IconButton>
                                        </TableRowColumn>
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
