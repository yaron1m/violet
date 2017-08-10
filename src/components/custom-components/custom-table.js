import React from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
} from 'material-ui/Table';
import PropTypes from 'prop-types';
import * as _ from "lodash";

class CustomTable extends React.Component {

    render() {
        let headerValues = this.props.headers.map((header) => (Object.values(header)[0]));

        return (
            <Table
                style={{tableLayout: 'auto'}}
                fixedHeader={false}
                onCellClick={a => console.log(a)}
                onRowClick={a => console.log(a)}
            >
                <TableHeader
                    adjustForCheckbox={false}
                    displaySelectAll={false}
                >

                    <TableRow>
                        {_.map(headerValues, ((title, index) =>
                                <TableHeaderColumn key={index}>{title}</TableHeaderColumn>
                        ))}

                    </TableRow>

                </TableHeader>

                <TableBody
                    displayRowCheckbox={false}
                    showRowHover={true}
                >
                    {this.props.children}
                </TableBody>

            </Table>
        );
    }
}


CustomTable.propTypes = {
    headers: PropTypes.array.isRequired,
};


export default CustomTable;
