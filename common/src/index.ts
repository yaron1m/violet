import IOrder, {IOrderStringField, ILectureTimeField, IOrderBooleanField} from './Interfaces/IOrder';
import {
    Status,
    TabKey,
    progressiveStatuses,
    terminatingStatuses,
    getStatusLabels,
    getOrderStatusLabel,
    getStatusLabel
} from './Interfaces/Status';
import IOrganization from './Interfaces/IOrganization';
import IPublicCourse, {IPublicCourseLecture, isPublicCourseOrder} from './Interfaces/IPublicCourse';
import IStringObject from "./Interfaces/IStringObject";
import ILectureTime from './Interfaces/ILectureTime';
import {IPublicCourseParticipant} from './Interfaces/IPublicCourseParticipant';
import {
    calculateDuration,
    calculatePreparationTimes,
    hasDatePassed,
    toDateFormat,
    toPrintableDateFormat
} from './Util/TimeUtil';
import calculateOrderStatus from './OrderStatus/OrderStatusCalculator';
import {isMatchingStatus} from './OrderStatus/OrderStatusUtils';

// Interfaces
export {
    IStringObject,
    ILectureTime,
    ILectureTimeField,
    IOrder,
    IPublicCourseParticipant,
    IOrganization,
    IPublicCourse,
    IPublicCourseLecture,
    IOrderStringField,
    IOrderBooleanField,
};

// Utils
export {isPublicCourseOrder};

// Status
export {
    Status, TabKey, progressiveStatuses, terminatingStatuses, getStatusLabels, getOrderStatusLabel, getStatusLabel
};

// TimeUtil
export {calculateDuration, calculatePreparationTimes, hasDatePassed, toDateFormat, toPrintableDateFormat};

// OrderStatus
export {calculateOrderStatus, isMatchingStatus}