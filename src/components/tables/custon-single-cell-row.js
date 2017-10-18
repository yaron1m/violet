import React from 'react';
import {TableRow, TableRowColumn} from 'material-ui/Table';
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
            <TableRow selectable={false}>
                {headerKeys.map((header, index) =>
                    index === textCellIndex ?
                        <TableRowColumn key={index}>
                            <div style={{cursor: "pointer"}} onClick={this.props.onClick}>
                                {this.props.text}
                            </div>
                        </TableRowColumn>
                        : <TableRowColumn key={index}/>
                )}
            </TableRow>
        );
    }
}


CustomSingleCellRow.propTypes = {
    enabled: PropTypes.bool.isRequired,
    headers: PropTypes.array.isRequired,
    onClick: PropTypes.func,
    text: PropTypes.string,
};