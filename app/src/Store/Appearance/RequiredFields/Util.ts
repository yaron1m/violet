import * as _ from 'lodash';
import IOrder from '../../../Interfaces/IOrder';
import {TabKey} from '../../../Util/Constants/Status';

function arrayMerge(objValue: string[], srcValue: string[]) {
    if (_.isArray(objValue)) {
        return objValue.concat(srcValue);
    }
}

export interface IRequiredFields {
    order: string[];
    organization: string[];
    lectureTimes: string[];
    internalOrder: string[];
    publicCourse: string[];
}

export function mergerRequiredFields(base: IRequiredFields, newFields: Partial<IRequiredFields> = {}): IRequiredFields {
    return _.mergeWith(_.cloneDeep(base), newFields, arrayMerge);
}

export function hasMissingFields(object: any, required: string[]) {
    const nonEmptyKeys = _.filter(_.keys(object), key => object[key] !== '');
    return !_.isEmpty(_.difference(required, nonEmptyKeys));
}

export function isRightTabKey(selectedOrder: IOrder, tabKey: TabKey, isDefaultTab = false) {
    if (selectedOrder.lectureDetailsTabKey === undefined)
        return isDefaultTab;

    return selectedOrder.lectureDetailsTabKey === tabKey;
}