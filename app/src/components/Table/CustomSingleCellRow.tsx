import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import * as _ from "lodash";

export function CustomSingleCellRow(props: CustomSingleCellRowProps){
        if (!props.enabled)
            return null;

        let headerKeys = props.headers.map((header) => (Object.keys(header)[0]));

        if (props.hideEdit) {
            headerKeys = _.dropRight(headerKeys);
        }

        const numberOfColumns = headerKeys.length;
        const textCellIndex = _.floor(numberOfColumns / 2);

        return (
            <TableRow>
                {headerKeys.map((header, index) =>
                    index === textCellIndex ?
                        <TableCell key={index}>
                            <div style={{cursor: "pointer"}} onClick={props.onClick}>
                                {props.text}
                            </div>
                        </TableCell>
                        :
                        <TableCell key={index}/>
                )}
            </TableRow>
        );
}


interface CustomSingleCellRowProps {
    enabled?: boolean;
    hideEdit?: boolean;
    headers: {[key:string]:string}[];
    onClick: () => void;
    text?: string;
}