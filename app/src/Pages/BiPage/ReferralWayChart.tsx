import React from "react";
import {IReferralWayCounters} from "./BiPageContentContainer";
import Chart from "react-apexcharts";
import * as _ from "lodash";

export default function (props: { referralWayCounters: IReferralWayCounters }) {

    const ways = _.keys(props.referralWayCounters);
    const values = _.map(ways, way => props.referralWayCounters[way]);

    return (
        <div className="app">
            <div className="row">
                <div className="mixed-chart">
                    <Chart
                        options={{
                            labels: ways
                        }}
                        series={values}
                        type="donut"
                        width="1000"
                    />
                </div>
            </div>
        </div>
    )
}