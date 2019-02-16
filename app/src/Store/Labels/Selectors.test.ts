import {getLabels} from './Selectors';
import {IState} from '../../Interfaces/ReduxInterfaces';

const sampleState = {
    labels: {
        softwareName: 'Violet',
        version: '0.0.0',
        header: {
            searchLineHint: 'חיפוש...',
            organizationPrefix: 'ארגון: ',
            orderPrefix: 'הזמנה: ',
        },
    }
} as unknown as IState;

describe('Store/Labels/selectors', () => {

    it('getLabels - valid', () => {
        expect(getLabels(sampleState))
            .toEqual(sampleState.labels);
    });
});

// TODO missing tests herer