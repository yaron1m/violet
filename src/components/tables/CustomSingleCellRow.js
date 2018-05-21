import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import PropTypes from 'prop-types';
import * as _ from "lodash";

export class CustomSingleCellRow extends React.Component {

    render() {
        if (!this.props.enabled)
            return null;

        let headerKeys = this.props.headers.map((header) => (Object.keys(header)[0]));

        if (this.props.hideEdit) {
            headerKeys = _.dropRight(headerKeys);
        }

        const numberOfColumns = headerKeys.length;
        const textCellIndex = _.floor(numberOfColumns / 2);

        return (
            <TableRow
                // selectable={false}
            >
                {headerKeys.map((header, index) =>
                    index === textCellIndex ?
                        <TableCell key={index}>
                            <div style={{cursor: "pointer"}} onClick={this.props.onClick}>
                                {this.props.text}
                            </div>
                        </TableCell>
                        :
                        <TableCell key={index}/>
                )}
            </TableRow>
        );
    }
}


CustomSingleCellRow.propTypes = {
    enabled: PropTypes.bool.isRequired,
    hideEdit: PropTypes.bool,
    headers: PropTypes.array.isRequired,
    onClick: PropTypes.func,
    text: PropTypes.string,
};