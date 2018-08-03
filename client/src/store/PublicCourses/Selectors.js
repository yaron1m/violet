import _ from "lodash";

export function getPublicCourses(state) {
    return state.publicCourses;
}

export function getNextPublicCourseId(state) {
    const courses = getPublicCourses(state);
    const keys = _.keys(courses);
    if (!courses || keys.length === 0)
        return null;
    return _.max(_.map(_.keys(courses), _.parseInt)) + 1;
}

export function getPublicCourseById(state, id) {
    return getPublicCourses(state)[id];
}

export function getPublicCourseByOrder(state, order) {
    return getPublicCourses(state)[order.publicCourseId];
}

export function getPublicCoursesSummary(state) {
    const courses = getPublicCourses(state);

    function map(course) {
        const result = {
            id: course.id,
            courseName: course.courseName,
            courseLocation: course.courseLocation,
        };
        if (!_.isEmpty(course.lectures)) {
            const dates = _.map(course.lectures, x => x.date);
            result.date = dates.sort()[0];
        }

        return result;
    }

    return _.reverse(_.map(courses, map))
}