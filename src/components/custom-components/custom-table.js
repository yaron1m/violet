import React from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import EditIcon from 'material-ui/svg-icons/image/edit';
import {IconButton} from "material-ui";
import PropTypes from 'prop-types';


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
                        {headerValues.map((title, index) => {
                            if (title === "עריכה")
                                return ( <TableHeaderColumn key={index}>{title}</TableHeaderColumn>);
                            return ( <TableHeaderColumn key={index}>{title}</TableHeaderColumn>);

                        })}

                    </TableRow>

                </TableHeader>

                <TableBody
                    displayRowCheckbox={!this.props.showCheckBox}
                    showRowHover={true}
                >
                    {
                        Object.keys(data).map(
                            index =>
                                <TableRow key={index} selectable={!this.props.showCheckBox}>
                                    {
                                        headerKeys.map((headerKey) => {
                                            if (headerKey === "edit")
                                                return ( <TableRowColumn key={headerKey}>
                                                             <IconButton onClick={this.props.onEditButton}>
                                                                 <EditIcon/>
                                                             </IconButton>
                                                         </TableRowColumn>);
                                            return (<TableRowColumn key={headerKey}>{data[index][headerKey]}</TableRowColumn>);

                                        })}
                                </TableRow>
                        )
                    }
                </TableBody>

            </Table>
        );
    }
}


CustomTable.propTypes = {
    headers: PropTypes.array,
    //data: PropTypes.object,
    data: PropTypes.array,
    showCheckBox: PropTypes.bool,
    showEditButton: PropTypes.bool,
    onEditButton: PropTypes.func,
};

CustomTable.defaultProps = {
    showCheckBox: true,
};

export default CustomTable;
