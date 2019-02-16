import {selectFieldUpdateAction} from './CourseSelectorContainer';
import * as SelectedActions from '../../../../../Store/SelectedPublicCourse/Actions';
import * as SelectedOrderActions from '../../../../../Store/SelectedOrder/Actions';
import {removeParticipantsFromAllLectures, updateSelectedOrder} from '../../../../../Store/SelectedOrder/Actions';
import {IDispatch} from '../../../../../Interfaces/ReduxInterfaces';

describe('selectFieldUpdateAction', () => {
    let dispatch: IDispatch;
    const publicCourseId = 150;

    beforeEach(() => {
        // @ts-ignore
        SelectedActions.selectPublicCourse = jest.fn();
        // @ts-ignore
        SelectedOrderActions.updateSelectedOrder = jest.fn();
        // @ts-ignore
        SelectedOrderActions.removeParticipantsFromAllLectures = jest.fn();
        dispatch = jest.fn();
    });

    it('should select public course', () => {

        selectFieldUpdateAction(dispatch, publicCourseId);

        // @ts-ignore
        expect(SelectedActions.selectPublicCourse.mock.calls).toHaveLength(1);
        expect(SelectedActions.selectPublicCourse).toBeCalledWith(publicCourseId.toString());
    });

    it('should update the public course id in selected order', () => {
        selectFieldUpdateAction(dispatch, publicCourseId);

        // @ts-ignore
        expect(updateSelectedOrder.mock.calls).toHaveLength(1);
        expect(updateSelectedOrder).toBeCalledWith('publicCourseId', publicCourseId);
    });

    it('should remove order participants from all lectures', () => {
        selectFieldUpdateAction(dispatch, publicCourseId);

        // @ts-ignore
        expect(removeParticipantsFromAllLectures.mock.calls).toHaveLength(1);
        expect(removeParticipantsFromAllLectures).toBeCalledWith();
    });
});