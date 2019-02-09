import {selectFieldUpdateAction} from '../CourseSelectorContainer';
import * as SelectedActions from "../../../../../../../Store/SelectedPublicCourse/Actions";
import * as SelectedOrderActions from "../../../../../../../Store/SelectedOrder/Actions";
import {removeParticipantsFromAllLectures, updateSelectedOrder} from "../../../../../../../Store/SelectedOrder/Actions";

describe('selectFieldUpdateAction', () => {
    let dispatch;
    const publicCourseId = 150;

    beforeEach(() => {
        SelectedActions.selectPublicCourse = jest.fn();
        SelectedOrderActions.updateSelectedOrder = jest.fn();
        SelectedOrderActions.removeParticipantsFromAllLectures = jest.fn();
        dispatch = jest.fn();
    });

    it('should select public course', () => {

        selectFieldUpdateAction(dispatch, publicCourseId);

        expect(SelectedActions.selectPublicCourse.mock.calls).toHaveLength(1);
        expect(SelectedActions.selectPublicCourse).toBeCalledWith(publicCourseId);
    });

    it('should update the public course id in selected order', () => {
        selectFieldUpdateAction(dispatch, publicCourseId);

        expect(updateSelectedOrder.mock.calls).toHaveLength(1);
        expect(updateSelectedOrder).toBeCalledWith("publicCourseId", publicCourseId);
    });

    it('should remove order participants from all lectures', () => {
        selectFieldUpdateAction(dispatch, publicCourseId);

        expect(removeParticipantsFromAllLectures.mock.calls).toHaveLength(1);
        expect(removeParticipantsFromAllLectures).toBeCalledWith();
    });
});