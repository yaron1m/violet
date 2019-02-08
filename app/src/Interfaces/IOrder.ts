import {Status, TabKey} from '../util/Constants/Status';

export default interface IOrder{
    id: string;
    status: Status;
    followUpRequired: boolean;
    lectureDetailsTabKey: TabKey;
}