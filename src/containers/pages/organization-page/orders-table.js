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
import EditIcon from 'material-ui/svg-icons/image/edit';
import {IconButton} from "material-ui";
import {selectOrder} from "../../../actions/action-orders";
import {withRouter} from "react-router";


class OrdersTable extends React.Component {

    render() {
        let data = Object.values(this.props.orders)
            .filter((order) => order.id === this.props.selected.organization.id);


        if (!data)
            data = {}; //TODO think about this

        return (
            <Table style={{tableLayout: 'auto'}} fixedHeader={false}>
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
                        Object.keys(data).map(
                            index =>
                                <TableRow key={index} selectable={false}>
                                    <TableRowColumn>{data[index].id}</TableRowColumn>
                                    <TableRowColumn>{data[index].date}</TableRowColumn>
                                    <TableRowColumn>{data[index].topic}</TableRowColumn>
                                    <TableRowColumn>{data[index].status}</TableRowColumn>
                                    <TableRowColumn>
                                        <IconButton
                                            onClick={() => {
                                                this.props.dispatch(selectOrder(data[index]));
                                                this.props.history.push('/form');
                                            }}
                                        >
                                            <EditIcon/>
                                        </IconButton>
                                    </TableRowColumn>
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
        labels: state.softwareLabels.OrganizationPage.ordersTable,
        orders: state.orders,
        selected: state.selected,
    };
}

export default withRouter(connect(mapStateToProps)(OrdersTable));
