import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/AddCircleOutline';
import PropTypes from 'prop-types';
import * as _ from "lodash";
import {isEmptyValue} from "../../util/StringUtil";
import {CustomIconButton} from "../CustomComponents/CustomButtons";

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
            <TableCell key={key}>
                <div style={{cursor: "pointer"}}
                     onClick={() => clickAction(this.props.onEditButton, this.props.rowIndex)}>
                    {this.getCellContent.bind(this)(headerKey)}
                </div>
            </TableCell>);
    }

    getCellContent(headerKey) {
        if (headerKey.toLowerCase().includes("date"))
            return isEmptyValue(this.props.element, headerKey) ? "" :
                new Date(this.props.element[headerKey]).toLocaleDateString();

        switch (headerKey) {
            case "edit":
                return ( <div>
                    <CustomIconButton onClick={() => this.props.onEditButton(this.props.rowIndex)}>
                        <EditIcon/>
                    </CustomIconButton>
                    {this.props.onDeleteButton ? (
                        <CustomIconButton onClick={() => this.props.onDeleteButton(this.props.rowIndex)}>
                            <DeleteIcon/>
                        </CustomIconButton>
                    ) : null}
                </div>);

            case "pick":
                return (
                    <CustomIconButton onClick={() => this.props.onPickButton(this.props.rowIndex)}>
                        <CheckIcon/>
                    </CustomIconButton>);
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
            <TableRow>
                {_.map(headerKeys, this.getCell.bind(this))}
            </TableRow>
        );
    }
}


CustomTableRow.propTypes = {
    element: PropTypes.object.isRequired,
    headers: PropTypes.array.isRequired,
    rowIndex: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.number
    ]),
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
