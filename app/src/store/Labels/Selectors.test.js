import {getLabels} from "./Selectors";

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

describe('store/Labels/selectors', () => {

    it('getLabels - valid', () => {
        expect(getLabels(sampleState))
            .toEqual(sampleState.labels);
    })
});

//TODO missing tests herer