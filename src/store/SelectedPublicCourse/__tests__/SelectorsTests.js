import Immutable from 'seamless-immutable';
import {getSelectedPublicCourse, isSelectedPublicCourse} from "../Selectors";

const sampleState = Immutable({
    selected: {
        publicCourse: {
            id: 555,
        },
        isSelectedPublicCourse: true
    }
});

const emptyState = Immutable({
    selected: {
        publicCourse: {},
        isSelectedPublicCourse: false,
    }
});

describe('store/selected/selectors', () => {
    it('should return selected public course', () => {
        expect(getSelectedPublicCourse(sampleState))
            .toEqual(sampleState.selected.publicCourse);
    });

    it('should return empty object', () => {
        expect(getSelectedPublicCourse(emptyState))
            .toEqual({});
    });


    it('should return isSelectedPublicCourse', () => {
        expect(isSelectedPublicCourse(sampleState))
            .toBeTruthy();
    });

    it('should return isSelectedPublicCourse', () => {
        expect(isSelectedPublicCourse(emptyState))
            .toBeFalsy();
    });
});