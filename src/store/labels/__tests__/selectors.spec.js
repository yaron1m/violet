import {getLabels} from "../reducer";

const sampleState = {
    labels: {
        softwareName: "Violet",
        version: "0.0.0",
        header: {
            searchLineHint: "חיפוש...",
            organizationPrefix: "ארגון: ",
            orderPrefix: "הזמנה: ",
        },
    }
};

describe('store/labels/selectors', () => {

    it('getLabels - valid', () => {
        expect(getLabels(sampleState))
            .toEqual(sampleState.labels);
    })
});