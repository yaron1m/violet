import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/AddCircleOutline";
import * as _ from "lodash";
import {isEmptyValue} from "../../Util/StringUtil";
import {CustomIconButton} from "../CustomComponents/CustomButtons";
import {IStringObject} from "../../Interfaces/IOrder";
import {toPrintableDateFormat} from "../../Util/TimeUtil";

export default class CustomTableRow<TElement extends IStringObject> extends React.Component<CustomTableRowProps<TElement>> {

    getCell(headerKey: string) {
        function clickAction(onEditButton: (element: TElement) => void, element: TElement) {
            if (onEditButton === undefined)
                return;

            if (headerKey === "edit" || headerKey === "pick")
                return;

            onEditButton(element);
        }

        return (
            <TableCell key={headerKey}>
                <div
                    style={{cursor: "pointer"}}
                    onClick={() => clickAction(this.props.onEditButton, this.props.element)}
                >
                    {this.getCellContent.bind(this)(headerKey)}
                </div>
            </TableCell>
        );
    }

    getCellContent(headerKey: string) {
        if (headerKey.toLowerCase().includes("date"))
            return isEmptyValue(this.props.element, headerKey) ? "" :
                toPrintableDateFormat(new Date(this.props.element[headerKey]));

        switch (headerKey) {
            case "edit":
                return (<div>
                    <CustomIconButton onClick={() => this.props.onEditButton(this.props.element)}>
                        <EditIcon/>
                    </CustomIconButton>
                    {this.props.onDeleteButton !== undefined && (
                        <CustomIconButton onClick={() => this.props.onDeleteButton && this.props.onDeleteButton(this.props.element)}>
                            <DeleteIcon/>
                        </CustomIconButton>
                    )}
                </div>);

            case "pick":
                return (
                    <CustomIconButton onClick={() => this.props.onPickButton && this.props.onPickButton(this.props.element)}>
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

interface CustomTableRowProps<TElement> {
    element: TElement;
    headers: IStringObject[];
    onEditButton: (element: TElement) => void;
    onPickButton?: (element: TElement) => void;
    onDeleteButton?: (element: TElement) => void;
    error?: boolean;
    hideEdit?: boolean;
}