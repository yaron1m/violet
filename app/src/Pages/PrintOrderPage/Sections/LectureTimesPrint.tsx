import React from "react";
import PrintSection from "../../../Components/CustomComponents/OrderPrint/PrintSection";
import _ from "lodash";
import {isEmptyValue} from "../../../Util/StringUtil";
import {ILectureTime, ILectureTimeField, IStringObject} from "../../../Interfaces/IOrder";
import {toPrintableDateFormat} from "../../../Util/TimeUtil";

export default function (props: LectureTimesPrintProps) {
    const style = {
        table: {
            width: "100%",
            borderCollapse: "collapse" as "collapse",
        },
        header: {
            border: "1px solid black",
        },
        value: {
            border: "1px solid black",
            fontWeight: "bold" as "bold"
        }
    };

    const tableHeaders = _.dropRight(props.tableHeaders);
    return (
        <PrintSection title="הרצאות">
            <table style={style.table}>
                <tbody>
                <tr>
                    {tableHeaders.map((header, index) =>
                        <td key={index} style={style.header}> {_.values(header)} </td>
                    )}
                </tr>

                {props.lectureTimes ?
                    _.orderBy(props.lectureTimes, x => x.date).map((lectureTime, index) =>
                        <tr key={index}>
                            {tableHeaders.map((headerObj, index2) => {
                                    const header = _.keys(headerObj)[0] as ILectureTimeField;
                                    const value = lectureTime[header];

                                    if (header.toLowerCase().includes("date"))
                                        return isEmptyValue(lectureTime, header) ?
                                            <td key={index2} style={style.value}>

                                            </td> :
                                            <td key={index2} style={style.value}>{toPrintableDateFormat(new Date(value))}</td>;

                                    return <td key={index2} style={style.value}> {lectureTime[header]} </td>;
                                }
                            )}
                        </tr>
                    ) : null}
                </tbody>
            </table>
        </PrintSection>
    );
}

interface LectureTimesPrintProps {
    tableHeaders: IStringObject[];
    lectureTimes: ILectureTime[];
}