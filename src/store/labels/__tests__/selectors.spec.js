import Immutable from 'seamless-immutable';
import {Selector} from 'redux-testkit';
import * as uut from '../reducer';

const sampleState = Immutable({
    labels: {
        softwareName: "Violet",
        version: "0.0.0",
        header: {
            searchLineHint: "חיפוש...",
            organizationPrefix: "ארגון: ",
            orderPrefix: "הזמנה: ",
        },
    }
});

describe('store/labels/selectors', () => {

    it('should get labels', () => {
        Selector(uut.getLabels).expect(sampleState).toReturn(sampleState.labels);
    });
});