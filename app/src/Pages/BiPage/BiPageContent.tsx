import React from "react";
import CustomPaperTable from "../../Components/Table/CustomPaperTable";
import {IOrderSummary} from "../../Store/Orders/Selectors";
import {BiPageContentContainerProps, IReferralWayCounters} from "./BiPageContentContainer";
import CustomDatePicker from "../../Components/CustomComponents/CustomDatePicker";
import {IStringObject, Status} from "@violet/common";
import CustomSelectField from "../../Components/CustomComponents/CustomSelectField";
import {Size} from "../../Util/Constants/Size";
import * as _ from "lodash";
import {getStatusLabels} from "@violet/common/lib";

// TODO move this to common - duplicate code
function getStatuses() {
    const statusObjects = _.map(getStatusLabels(),
        (label, status) => {
            return {
                key: status,
                label
            };
        });

    return _.dropRight(statusObjects);
}

export default function (props: BiPageContentProps) {

    const filters = (
        <div style={{
            marginTop: 20,
        }}>
            <CustomDatePicker
                title="תאריך התחלה"
                value={props.startDate}
                onChange={props.setStartDate}
            />

            <CustomDatePicker
                title="תאריך סיום"
                value={props.endDate}
                onChange={props.setEndDate}
            />

            <CustomSelectField
                title="סנן לפי סטאטוס"
                value={props.filterStatus as string}
                onChange={(value: string) => props.setFilterStatus(value as Status)}
                options={getStatuses()}
                size={Size.XL}
                allowEmpty={true}
            />

            {/*{JSON.stringify(props.referralWayCounters)}*/}

        </div>
    );

    return (
        <CustomPaperTable
            title="איך הגיעו אלינו"
            elements={props.ordersMatchingFilters}
            onEditButton={props.onTableRowEdit}
            beforeTable={filters}
            tableHeaders={[
                {id: "מספר הזמנה"},
                {organizationName: "שם הארגון"},
                {date: "תאריך הרצאה"},
                {topic: "נושא"},
                {status: "סטאטוס"},
                {orgReferralWay: "איך הגיע אלינו"},
                {edit: "עריכה"}
            ] as IStringObject[]}
        />
    );
}

export interface BiPageContentProps extends BiPageContentContainerProps {
    ordersMatchingFilters: IOrderSummary[];
    referralWayCounters: IReferralWayCounters;
    onTableRowEdit: (orderSummary: IOrderSummary) => void;
}