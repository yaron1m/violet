import React from 'react';
import {shallow} from 'enzyme'
import SearchBox from '../SearchBox';
import * as HistoryUtil from "../../../../util/history-util";

const props = {
    hintText: "hintText",
    dataSource: [],
};

let enzymeWrapper;

describe('search box', () => {
    beforeEach(() => {
        HistoryUtil.redirect = jest.fn();
        props.handleRequest = jest.fn();
        props.onSuggestionSelected = jest.fn();
        enzymeWrapper = shallow(<SearchBox {...props} />);
    });

    it('handleRequest - choose organization - search text is set to empty', () => {
        enzymeWrapper.instance().setState({searchText: "AAA"});

        enzymeWrapper.instance().handleRequest({}, 99);

        expect(enzymeWrapper.instance().state.searchText).toEqual("");
    });
});