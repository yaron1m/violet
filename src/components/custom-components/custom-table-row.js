import React from 'react';
import {TableRow, TableRowColumn} from 'material-ui/Table';
import EditIcon from 'material-ui/svg-icons/image/edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
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
            >
                {
                    _.map(this.props.headerKeys, (headerKey) => {
                        switch (headerKey) {
                            case "edit":
                                return ( <TableRowColumn key={headerKey}>
                                    <IconButton onClick={() => this.props.onEditButton(this.props.element.id)}>
                                        <EditIcon/>
                                    </IconButton>
                                    {this.props.onDeleteButton ? (
                                        <IconButton onClick={() => this.props.onDeleteButton(this.props.element.id)}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    ) : null}
                                </TableRowColumn>);
                            case "date":
                                return (
                                    <TableRowColumn key={headerKey}>
                                        {this.props.element[headerKey] === undefined ? "" : new Date(this.props.element[headerKey]).toLocaleDateString()}
                                    </TableRowColumn>);

                            default:
                                return (
                                    <TableRowColumn key={headerKey}>{this.props.element[headerKey]}</TableRowColumn>);
                        }
                    })}
            </TableRow>
        );
    }
}


CustomTableRow.propTypes = {
    element: PropTypes.object.isRequired,
    headerKeys: PropTypes.array.isRequired,
    onEditButton: PropTypes.func,
    onDeleteButton: PropTypes.func,
    missingFields: PropTypes.bool,
};

CustomTableRow.defaultProps = {
    onEditButton: null,
    missingFields: false,
};

export default CustomTableRow;
