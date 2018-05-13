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

        if (this.props.hideEdit){
            headerValues = _.dropRight(headerValues);
        }

        return (
            <Table
                style={{tableLayout: 'auto'}}
                fixedHeader={false}
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
    hideEdit: PropTypes.bool,
    children: PropTypes.node,
};

CustomTable.defaultProps = {
    hideEdit: false,
};

export default CustomTable;