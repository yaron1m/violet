import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {getLabels} from "../../../../../store/Labels/Selectors";
import CustomPaperTable from "../../../../../components/tables/CustomPaperTable";
import {getLecturesDetails} from "../../../../../store/SelectedPublicCourse/Selectors";
import {moneyFormat} from "../../../../../util/StringUtil";

function getBeforeTableDiv(labels, details) {
    const totalSum = moneyFormat(_.sumBy(details, lecture => lecture.income), labels.currencyIcon);
    return <div style={{padding: 10}}>
        {labels.pages.publicCoursePage.sections.courseIncomeSum}
        {totalSum}
    </div>
}

function mapStateToProps(state) {
    const details = getLecturesDetails(state);
    return {
        title: getLabels(state).pages.publicCoursePage.sections.courseLectureDetailsSectionName,
        elements: details,
        tableHeaders: getLabels(state).pages.publicCoursePage.LectureDetailsTableHeaders,
        onEditButton: () => {},
        beforeTable: getBeforeTableDiv(getLabels(state), details),
    };
}

export default connect(mapStateToProps)(CustomPaperTable);

