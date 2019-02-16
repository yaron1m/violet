import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import * as _ from "lodash";
import {IStringObject} from '../../Interfaces/IOrder';

export default function CustomTable(props: CustomTableProps) {

    // @ts-ignore
    let headerValues = props.headers.map((header) => (Object.values(header)[0]));

    if (props.hideEdit) {
        headerValues = _.dropRight(headerValues);
    }

    return (
        <Table>
            <TableHead>
                <TableRow>
                    {_.map(headerValues, ((title, index) =>
                            <TableCell key={index}>{title}</TableCell>
                    ))}

                </TableRow>
            </TableHead>

            <TableBody>
                {props.children}
            </TableBody>
        </Table>
    );
}

interface CustomTableProps {
    headers: IStringObject[];
    hideEdit?: boolean;
    children?: React.ReactNode;
}
