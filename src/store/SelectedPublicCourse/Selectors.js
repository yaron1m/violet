export function getSelectedPublicCourse(state) {
    return state.selected.publicCourse;
}

export function getSelectedPublicCourseLecture(state, lectureId) {
    return state.selected.publicCourse.lectures[lectureId];
}

export function isSelectedPublicCourse(state) {
    return state.selected.isSelectedPublicCourse;
}