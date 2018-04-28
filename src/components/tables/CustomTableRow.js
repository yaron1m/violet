import React from 'react';
import {TableRow, TableRowColumn} from 'material-ui/Table';
import EditIcon from 'material-ui-icons/Edit';
import DeleteIcon from 'material-ui-icons/Delete';
import CheckIcon from 'material-ui-icons/AddCircleOutline';
import IconButton from "material-ui/IconButton";
import PropTypes from 'prop-types';
import * as _ from "lodash";
import {isEmptyValue} from "../../util/string-util";
import Colors from "../../util/consts/colors";

class CustomTableRow extends React.Component {

    getCell(headerKey) {
        const key = headerKey + this.props.rowIndex;

        function clickAction(onEditButton, rowIndex) {
            if (onEditButton === null)
                return;

            if (headerKey === "edit" || headerKey === "pick")
                return;

            onEditButton(rowIndex);
        }

        return (
            <TableRowColumn key={key}>
                <div style={{cursor: "pointer"}}
                     onClick={() => clickAction(this.props.onEditButton, this.props.rowIndex)}>
                    {this.getCellContent.bind(this)(headerKey)}
                </div>
            </TableRowColumn>);
    }

    getCellContent(headerKey) {
        if (headerKey.toLowerCase().includes("date"))
            return isEmptyValue(this.props.element, headerKey) ? "" :
                new Date(this.props.element[headerKey]).toLocaleDateString();

        switch (headerKey) {
            case "edit":
                return ( <div>
                    <IconButton onClick={() => this.props.onEditButton(this.props.rowIndex)}>
                        <EditIcon/>
                    </IconButton>
                    {this.props.onDeleteButton ? (
                        <IconButton onClick={() => this.props.onDeleteButton(this.props.rowIndex)}>
                            <DeleteIcon/>
                        </IconButton>
                    ) : null}
                </div>);

            case "pick":
                return (
                    <IconButton onClick={() => this.props.onPickButton(this.props.rowIndex)}>
                        <CheckIcon/>
                    </IconButton>);
            default:
                return this.props.element[headerKey];
        }
    }


    render() {
        let headerKeys = this.props.headers.map((header) => (Object.keys(header)[0]));

        if (this.props.hideEdit) {
            headerKeys = _.dropRight(headerKeys);
        }

        return (
            <TableRow
                style={this.props.error ? {color: Colors.red} : {}}
                selectable={false}
                hoverable={true}
                key={this.props.rowIndex}
            >
                {_.map(headerKeys, this.getCell.bind(this))}
            </TableRow>
        );
    }
}


CustomTableRow.propTypes = {
    element: PropTypes.object.isRequired,
    headers: PropTypes.array.isRequired,
    rowIndex: PropTypes.number,
    onEditButton: PropTypes.func,
    onPickButton: PropTypes.func,
    onDeleteButton: PropTypes.func,
    error: PropTypes.bool,
    hideEdit: PropTypes.bool,
};

CustomTableRow.defaultProps = {
    onEditButton: null,
    onPickButton: null,
    error: false,
    hideEdit: false,
};

export default CustomTableRow;
