import * as Target from '.';
import {Status} from '../../Util/Constants/Status';
import {IState} from '../../Interfaces/ReduxInterfaces';
import IOrder from '../../Interfaces/IOrder';

function getState(orders: { [key: string]: IOrder }) {
    return {
        orders,
        organizations: {
            100: {
                organizationId: 100,
                organizationName: 'OrgA'
            }
        }
    } as unknown as IState;
}

describe('FutureLecturesPage', () => {
    it('getFutureLectureTimes - choose organization - load organization action', () => {
        const now = new Date();
        const yesterday = new Date();
        yesterday.setDate(now.getDate() - 1);
        yesterday.setHours(0, 0, 0, 0);

        const thisMorning = new Date();
        thisMorning.setHours(0, 0, 0, 0);

        const tomorrow = new Date();
        tomorrow.setDate(now.getDate() + 1);

        const orders = {
            '1000': {
                'id': 1000,
                'lectureTimes': [
                    {
                        topic: '3 days ago',
                        date: new Date().setDate(now.getDate() - 3)
                    },
                    {
                        topic: 'yesterday',
                        date: yesterday
                    },
                    {
                        topic: 'this morning',
                        date: thisMorning
                    },
                    {
                        topic: 'tomorrow',
                        date: tomorrow
                    },
                ],
                'status': Status.approvedOrder,
                organizationId: 100,
            } as unknown as IOrder,
            '1001': {
                'id': 1001,
                'lectureTimes': [
                    {
                        topic: 'lecture1',
                        date: new Date()
                    },
                    {
                        topic: 'other lecture',
                        date: new Date()
                    }
                ],
                'status': Status.contact,
                organizationId: 100,
            } as unknown as IOrder,
        };

        const result = Target.getFutureLectureTimes(getState(orders));

        expect(result).toHaveLength(2);
        expect(result[0].topic).toEqual('this morning');
        expect(result[1].topic).toEqual('tomorrow');
    });
});
