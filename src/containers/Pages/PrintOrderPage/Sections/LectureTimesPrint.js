import React from 'react';
import PrintSection from "../../../../components/custom-components/order-print/print-section";
import _ from 'lodash';
import {isEmptyValue} from "../../../../util/string-util";
import PropTypes from "prop-types";

export default class LectureTimesPrintSection extends React.Component {

    render() {
        const style = {
            table: {
                width: "100%", borderCollapse: "collapse",
            },
            header: {
                border: "1px solid black",
            },
            value: {
                border: "1px solid black",
                fontWeight: 'bold'
            }
        };

        const tableHeaders = _.dropRight(this.props.tableHeaders);
        return (
            <PrintSection title={this.props.sectionName}>
                <table style={style.table}>
                    <tbody>
                    <tr>
                        {tableHeaders.map((header, index) =>
                            <td key={index} style={style.header}> {_.values(header)} </td>
                        )}
                    </tr>

                    {this.props.lectureTimes ?
                        _.orderBy(this.props.lectureTimes, x => -x.date).map((lectureTime, index) =>
                        <tr key={index}>
                            {tableHeaders.map((header, index2) => {
                                    header = _.keys(header)[0];
                                    const value = lectureTime[header];

                                    if (header.toLowerCase().includes("date"))
                                        return isEmptyValue(lectureTime, header) ?
                                            <td key={index2} style={style.value}>

                                            </td> :
                                            <td key={index2} style={style.value}>{new Date(value).toLocaleDateString()}</td>;

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
}

LectureTimesPrintSection.propTypes = {
    sectionName: PropTypes.string,
    tableHeaders: PropTypes.array,
    lectureTimes: PropTypes.array,
};