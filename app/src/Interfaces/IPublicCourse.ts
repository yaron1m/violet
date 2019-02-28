export default interface IPublicCourse {
    id: number;
    changedDate: string;
    courseCity: string;
    courseLocation: string;
    courseName: string;
    createdDate: string;
    mealCost: string;
    distanceCost: string;
    roomsApproved: boolean;
    isoPayed: boolean;
    printedMaterials: boolean;
    printedCertificates: boolean;
    lectures: IPublicCourseLecture[];
}

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
