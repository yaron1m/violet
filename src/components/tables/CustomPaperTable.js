import React from 'react';
import PropTypes from 'prop-types';
import * as _ from "lodash";
import CustomPaper from "../CustomComponents/CustomPaper";
import CustomTable from "./CustomTable";
import CustomTableRow from "./CustomTableRow";
import {CustomSingleCellRow} from "./CustomSingleCellRow";

class CustomPaperTable extends React.Component {

    render() {
        let elements = this.props.elements;

        if (this.props.limit !== -1) {
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
                                rowIndex={this.props.rowIndexKey === null ? index : element[this.props.rowIndexKey]}
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

CustomPaperTable.propTypes = {
    title: PropTypes.string,
    elements: PropTypes.array.isRequired,
    hideEdit: PropTypes.bool,
    limit: PropTypes.number,
    rowIndexKey: PropTypes.string,
    tableHeaders: PropTypes.array.isRequired,
    onEditButton: PropTypes.func.isRequired,
    onDeleteButton: PropTypes.func,
    beforeTable: PropTypes.node,

    singleCellRow: PropTypes.bool,
    singleCellRowText: PropTypes.string,
    singleCellRowOnClick: PropTypes.func,
};

CustomPaperTable.defaultProps = {
    hideEdit: false,
    limit: -1,
    singleCellRow: false,
    rowIndexKey: "id",
};

export default CustomPaperTable;
