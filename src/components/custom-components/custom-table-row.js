import React from 'react';
import {TableRow, TableRowColumn} from 'material-ui/Table';
import EditIcon from 'material-ui/svg-icons/image/edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import CheckIcon from 'material-ui/svg-icons/content/add-circle-outline';
import IconButton from "material-ui/IconButton";
import PropTypes from 'prop-types';
import * as _ from "lodash";


class CustomTableRow extends React.Component {

    render() {
        return (
            <TableRow
                style={this.props.missingFields ? {color: "red"} : {}}
                selectable={false}
                hoverable={true}
                key={this.props.rowIndex}
            >
                {
                    _.map(this.props.headerKeys, (headerKey) => {
                        const key = headerKey + this.props.rowIndex;

                        switch (headerKey) {
                            case "edit":
                                return ( <TableRowColumn key={key}>
                                    <IconButton onClick={() => this.props.onEditButton(this.props.rowIndex)}>
                                        <EditIcon/>
                                    </IconButton>
                                    {this.props.onDeleteButton ? (
                                        <IconButton onClick={() => this.props.onDeleteButton(this.props.rowIndex)}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    ) : null}
                                </TableRowColumn>);

                            case "pick":
                                return (
                                    <TableRowColumn key={key}>
                                        <IconButton onClick={() => this.props.onPickButton(this.props.rowIndex)}>
                                            <CheckIcon/>
                                        </IconButton>
                                    </TableRowColumn>);
                            case "date":
                                return (
                                    <TableRowColumn key={key}>
                                        {this.props.element[headerKey] === undefined ? "" : new Date(this.props.element[headerKey]).toLocaleDateString()}
                                    </TableRowColumn>);

                            default:
                                return (
                                    <TableRowColumn key={key}>{this.props.element[headerKey]}</TableRowColumn>);
                        }
                    })}
            </TableRow>
        );
    }
}


CustomTableRow.propTypes = {
    element: PropTypes.object.isRequired,
    headerKeys: PropTypes.array.isRequired,
    rowIndex: PropTypes.number,
    onEditButton: PropTypes.func,
    onPickButton: PropTypes.func,
    onDeleteButton: PropTypes.func,
    missingFields: PropTypes.bool,
};

CustomTableRow.defaultProps = {
    onEditButton: null,
    onPickButton: null,
    missingFields: false,
};

export default CustomTableRow;
