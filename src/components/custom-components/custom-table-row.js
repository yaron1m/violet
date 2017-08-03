import React from 'react';
import {TableRow, TableRowColumn} from 'material-ui/Table';
import EditIcon from 'material-ui/svg-icons/image/edit';
import IconButton from "material-ui/IconButton";
import PropTypes from 'prop-types';
import * as _ from "lodash";


class CustomTableRow extends React.Component {

    render() {
        return (

            <TableRow selectable={!this.props.showCheckBox}>
                {
                    _.map(this.props.headerKeys, (headerKey) => {
                        if (headerKey === "edit")
                            return ( <TableRowColumn key={headerKey}>
                                <IconButton
                                    onClick={() => this.props.onEditButton(this.props.element.id)}
                                >
                                    <EditIcon/>
                                </IconButton>
                            </TableRowColumn>);
                        return (<TableRowColumn key={headerKey}>{this.props.element[headerKey]}</TableRowColumn>);
                    })}
            </TableRow>
        );
    }
}


CustomTableRow.propTypes = {
    element: PropTypes.object.isRequired,
    headerKeys: PropTypes.array.isRequired,
    onEditButton: PropTypes.func,
};

CustomTableRow.defaultProps = {
    onEditButton: null,
};

export default CustomTableRow;
