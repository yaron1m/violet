import React from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
} from 'material-ui/Table';
import PropTypes from 'prop-types';
import * as _ from "lodash";
import CustomTableRow from "./custom-table-row";


class CustomTable extends React.Component {

    render() {
        let headerKeys = this.props.headers.map((header) => (Object.keys(header)[0]));
        let headerValues = this.props.headers.map((header) => (Object.values(header)[0]));
        let data = this.props.data;
        if (!this.props.data)
            data = [];

        return (
            <Table style={{tableLayout: 'auto'}} fixedHeader={false}>
                <TableHeader
                    adjustForCheckbox={!this.props.showCheckBox}
                    displaySelectAll={false}
                >

                    <TableRow>
                        {_.map(headerValues, ((title, index) => {
                            if (title === "עריכה")
                                return ( <TableHeaderColumn key={index}>{title}</TableHeaderColumn>);
                            return ( <TableHeaderColumn key={index}>{title}</TableHeaderColumn>);

                        }))}

                    </TableRow>

                </TableHeader>

                <TableBody
                    displayRowCheckbox={!this.props.showCheckBox}
                    showRowHover={true}
                >
                    {
                        _.map(data, (dataElement =>
                                <CustomTableRow
                                    key={dataElement.id}
                                    headerKeys={headerKeys}
                                    element={dataElement}
                                    onEditButton={this.props.onEditButton}
                                />
                        ))
                    }
                </TableBody>

            </Table>
        );
    }
}


CustomTable.propTypes = {
    headers: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    showCheckBox: PropTypes.bool,
    showEditButton: PropTypes.bool,
    onEditButton: PropTypes.func,
};

CustomTable.defaultProps = {
    showCheckBox: true,
};

export default CustomTable;
