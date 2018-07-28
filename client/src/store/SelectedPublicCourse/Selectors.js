export function getSelectedPublicCourse(state) {
    return state.selectedPublicCourse.publicCourse;
}

export function getSelectedPublicCourseLecture(state, lectureId) {
    return state.selectedPublicCourse.publicCourse.lectures[lectureId];
}

export function isSelectedPublicCourse(state) {
    return state.selectedPublicCourse.isSelectedPublicCourse;
}