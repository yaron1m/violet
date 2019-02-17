export default interface IPublicCourse {
    id: number;
    changedDate: string;
    courseCity: string;
    courseLocation: string;
    courseName: string;
    createdDate: string;
    distanceCost: string;
    isoPayed: boolean;
    lectures: IPublicCourseLecture[];
}

export type IPublicCourseLectureField =
    "active" |
    "date" |
    "duration" |
    "endTime" |
    "id" |
    "isPublicCourseOrder" |
    "price" |
    "startTime" |
    "tie" |
    "topic";

export interface IPublicCourseLecture {
    active: boolean;
    date: string;
    duration: string;
    endTime: string;
    id: number;
    isPublicCourseOrder: boolean;
    price: string;
    startTime: string;
    tie: string;
    topic: string;
    guestLecturer: boolean;
}
