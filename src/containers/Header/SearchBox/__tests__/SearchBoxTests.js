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
        enzymeWrapper = shallow(<SearchBox {...props} />);
    });

    it('handleRequest - enter press - nothing happens', () => {
        enzymeWrapper.instance().handleRequest({}, -1);

        expect(props.handleRequest.mock.calls.length).toBe(0);
    });

    it('handleRequest - choose organization - search text is set to empty', () => {
        enzymeWrapper.instance().setState({searchText: "AAA"});

        enzymeWrapper.instance().handleRequest({}, 99);

        expect(enzymeWrapper.instance().state.searchText).toEqual("");
    });
});