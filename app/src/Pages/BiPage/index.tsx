import React, {useState} from "react";
import {Status} from "@violet/common";
import BiPageContentContainer from "./BiPageContentContainer";

export default function () {

    const thisYear = new Date().getFullYear();

    const [filterStatus, setFilterStatus] = useState<Status>();
    const [startDate, setStartDate] = useState(thisYear + "-01-01");
    const [endDate, setEndDate] = useState(thisYear + "-12-31");

    return <BiPageContentContainer
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
    />
}