import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import * as _ from "lodash";

class CustomTable extends React.Component {

    render() {
        let headerValues = this.props.headers.map((header) => (Object.values(header)[0]));

        if (this.props.hideEdit){
            headerValues = _.dropRight(headerValues);
        }

        return (
            <Table
                // style={{tableLayout: 'auto'}}
                // fixedHeader={false}
            >
                <TableHead
                    // adjustForCheckbox={false}
                    // displaySelectAll={false}
                >

                    <TableRow>
                        {_.map(headerValues, ((title, index) =>
                                <TableCell key={index}>{title}</TableCell>
                        ))}

                    </TableRow>

                </TableHead>

                <TableBody
                    // displayRowCheckbox={false}
                    // showRowHover={true}
                >
                    {this.props.children}
                </TableBody>

            </Table>
        );
    }
}

CustomTable.propTypes = {
    headers: PropTypes.array.isRequired,
    hideEdit: PropTypes.bool,
    children: PropTypes.node,
};

CustomTable.defaultProps = {
    hideEdit: false,
};

export default CustomTable;
