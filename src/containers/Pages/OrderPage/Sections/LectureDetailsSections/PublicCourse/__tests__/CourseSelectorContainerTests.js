import {selectFieldUpdateAction} from '../CourseSelectorContainer';
import * as SelectedActions from "../../../../../../../store/selected/actions";

describe('selectFieldUpdateAction', () => {
    let dispatch;
    const publicCourseId = 150;

    beforeEach(() => {
        SelectedActions.selectPublicCourse = jest.fn();
        SelectedActions.updateSelectedOrder = jest.fn();
        SelectedActions.removeParticipantsFromAllLectures = jest.fn();
        dispatch = jest.fn();
    });

    it('should select public course', () => {

        selectFieldUpdateAction(dispatch, publicCourseId);

        expect(SelectedActions.selectPublicCourse.mock.calls).toHaveLength(1);
        expect(SelectedActions.selectPublicCourse).toBeCalledWith(publicCourseId);
    });

    it('should update the public course id in selected order', () => {
        selectFieldUpdateAction(dispatch, publicCourseId);

        expect(SelectedActions.updateSelectedOrder.mock.calls).toHaveLength(1);
        expect(SelectedActions.updateSelectedOrder).toBeCalledWith("publicCourseId", publicCourseId);
    });

    it('should remove order participants from all lectures', () => {
        selectFieldUpdateAction(dispatch, publicCourseId);

        expect(SelectedActions.removeParticipantsFromAllLectures.mock.calls).toHaveLength(1);
        expect(SelectedActions.removeParticipantsFromAllLectures).toBeCalledWith();
    });
});