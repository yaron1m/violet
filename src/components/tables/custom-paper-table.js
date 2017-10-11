import React from 'react';
import PropTypes from 'prop-types';
import * as _ from "lodash";
import CustomPaper from "../../components/custom-components/custom-paper";
import CustomTable from "../../components/tables/custom-table";
import CustomTableRow from "../../components/tables/custom-table-row";
import {CustomSingleCellRow} from "./custon-single-cell-row";

class CustomPaperTable extends React.Component {

    render() {
        let elements = this.props.elements;

        if (this.props.limit !== -1) {
            elements = _.slice(elements, 0, this.props.limit);
        }

        return (
            <CustomPaper title={this.props.title}>

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
                                rowIndex={element[this.props.rowIndexKey]}
                                headers={this.props.tableHeaders}
                                element={element}
                                onEditButton={this.props.onEditButton}
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
    rowIndexKey: PropTypes.string.isRequired,
    tableHeaders: PropTypes.array.isRequired,
    onEditButton: PropTypes.func.isRequired,

    singleCellRow: PropTypes.bool,
    singleCellRowText: PropTypes.string,
    singleCellRowOnClick: PropTypes.func,
};

CustomPaperTable.defaultProps = {
    hideEdit: false,
    limit: -1,
    singleCellRow: false,
};

export default CustomPaperTable;
