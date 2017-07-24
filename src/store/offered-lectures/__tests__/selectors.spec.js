import Immutable from 'seamless-immutable';
import {Selector} from 'redux-testkit';
import * as uut from '../reducer';

const allTrueState = Immutable({
    offeredLectures: {
        "17025": true,
        "18001": true,
        "אופיין שרות": true,
        "אחריות הורית": true,
        "אחריות חברתית": true,
    }
});


const sampleState = Immutable({
    offeredLectures: {
        "17025": true,
        "18001": false,
        "אופיין שרות": true,
        "אחריות הורית": false,
        "אחריות חברתית": true,
    }
});

describe('store/offered-lectures/selectors', () => {

    it('should get array of lectures names', () => {
        const result = ["17025", "18001", "אופיין שרות", "אחריות הורית", "אחריות חברתית"];
        Selector(uut.getOfferedLectures).expect(allTrueState).toReturn(result);
    });

    it('should get array of active lectures names', () => {
        const result = ["17025", "אופיין שרות", "אחריות חברתית"];
        Selector(uut.getOfferedLectures).expect(sampleState).toReturn(result);
    });

    // it('should get topics when full', () => {
    //     const result = [fullState.topics.topicsByUrl, ['url1', 'url2', 'url3']];
    //     Selector(uut.getTopics).expect(fullState).toReturn(result);
    // });
    //
    // it('should get selected topics URLs', () => {
    //     Selector(uut.getSelectedTopicUrls).expect(emptyState).toReturn([]);
    //     Selector(uut.getSelectedTopicUrls).expect(fullState).toReturn(fullState.topics.selectedTopicUrls);
    // });
    //
    // it('should get selected topics by URL', () => {
    //     Selector(uut.getSelectedTopicsByUrl).expect(emptyState).toReturn({});
    //     Selector(uut.getSelectedTopicsByUrl).expect(fullState).toReturn({
    //         url1: fullState.topics.topicsByUrl['url1']
    //     });
    //     const stateWithTwoSelected = _.cloneDeep(fullState);
    //     stateWithTwoSelected.topics.selectedTopicUrls = ['url1', 'url2'];
    //     Selector(uut.getSelectedTopicsByUrl).expect(stateWithTwoSelected).toReturn({
    //         url1: fullState.topics.topicsByUrl['url1'],
    //         url2: fullState.topics.topicsByUrl['url2']
    //     });
    // });
    //
    // it('should return if topic selection is valid', () => {
    //     Selector(uut.isTopicSelectionValid).expect(fullState).toReturn(false);
    //     const stateWithThreeSelected = _.cloneDeep(fullState);
    //     stateWithThreeSelected.topics.selectedTopicUrls = ['url1', 'url2', 'url3'];
    //     Selector(uut.isTopicSelectionValid).expect(stateWithThreeSelected).toReturn(true);
    // });
    //
    // it('should return if topic selection is finalized', () => {
    //     Selector(uut.isTopicSelectionFinalized).expect(fullState).toReturn(false);
    //     const finalizedState = {
    //         topics: {
    //             selectionFinalized: true
    //         }
    //     };
    //     Selector(uut.isTopicSelectionFinalized).expect(finalizedState).toReturn(true);
    // });

});