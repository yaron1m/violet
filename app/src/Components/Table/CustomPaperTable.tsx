import React from "react";
import * as _ from "lodash";
import CustomPaper from "../CustomComponents/CustomPaper";
import CustomTable from "./CustomTable";
import CustomTableRow from "./CustomTableRow";
import {CustomSingleCellRow} from "./CustomSingleCellRow";
import {IStringObject} from "@violet/common";

export default class CustomPaperTable<TElement extends ITableElement>
    extends React.Component<CustomPaperTableProps<TElement>> {

    render() {
        let elements = this.props.elements;

        if (this.props.limit !== undefined && this.props.limit !== -1) {
            elements = _.slice(elements, 0, this.props.limit);
        }

        return (
            <CustomPaper title={this.props.title}>
                {this.props.beforeTable}

                <CustomTable headers={this.props.tableHeaders} hideEdit={this.props.hideEdit}>
                    <CustomSingleCellRow
                        enabled={this.props.singleCellRow}
                        headers={this.props.tableHeaders}
                        onClick={this.props.singleCellRowOnClick}
                        text={this.props.singleCellRowText}
                    />

                    {
                        elements.map((element, index) =>
                            <CustomTableRow
                                key={index}
                                headers={this.props.tableHeaders}
                                element={element}
                                onEditButton={this.props.onEditButton}
                                onDeleteButton={this.props.onDeleteButton}
                                hideEdit={this.props.hideEdit}
                            />
                        )
                    }
                </CustomTable>
            </CustomPaper>
        );
    }
}

export type ITableElement = { [key: string]: (string | number) };

interface CustomPaperTableProps<TElement extends ITableElement> {
    title?: string,
    elements: TElement[],
    hideEdit?: boolean,
    limit?: number,
    tableHeaders: IStringObject[],
    onEditButton: (element: TElement) => void,
    onDeleteButton?: (element: TElement) => void,
    beforeTable?: React.ReactNode,

    singleCellRow?: boolean,
    singleCellRowText?: string,
    singleCellRowOnClick?: () => void,
}