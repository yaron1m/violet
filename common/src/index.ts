import IOrder, {IOrderStringField, ILectureTimeField, IOrderBooleanField} from './Interfaces/IOrder';
import {Status, TabKey, progressiveStatuses, terminatingStatuses, getStatusLabels} from './Interfaces/Status';
import IOrganization from './Interfaces/IOrganization';
import IPublicCourse, {IPublicCourseLecture} from './Interfaces/IPublicCourse';
import IStringObject from "./Interfaces/IStringObject";
import ILectureTime from './Interfaces/ILectureTime';
import {IPublicCourseParticipant} from './Interfaces/IPublicCourseParticipant';

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
    Status,
    TabKey,
    progressiveStatuses,
    terminatingStatuses,
    IOrderStringField,
    IOrderBooleanField,
};

// Utils
export {getStatusLabels};