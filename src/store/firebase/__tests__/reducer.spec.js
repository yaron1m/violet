import React from 'react';
import {isFetching, isLoggedIn} from "../reducer";

function setup(extraProps,orders,organizations) {
    const state = {
        firebase: {
            loggedIn: undefined,
            userId: undefined,
            displayName: "",
            photoURL: "",
            fetchingCount: 3,
            ...extraProps
        },
        orders:{
            ...orders
        },
        organizations:{
            ...organizations
        },
    };

    return state;
}

describe('Firebase selectors', () => {

    it('isLoggedIn - initial state - false', () => {
        const target = setup({});
        expect(isLoggedIn(target)).toBeFalsy();
    });

    it('isLoggedIn - not logged in - false', () => {
        const target = setup({loggedIn:false});
        expect(isLoggedIn(target)).toBeFalsy();
    });

    it('isLoggedIn - logged in - true', () => {
        const target = setup({loggedIn:true});
        expect(isLoggedIn(target)).toBeTruthy();
    });

    it('isFetching - initial state - true', () => {
        const target = setup({});
        expect(isFetching(target)).toBeTruthy();
    });

    it('isFetching - orders not fetched - true', () => {
        const target = setup({},{},{1:1});
        expect(isFetching(target)).toBeTruthy();
    });

    it('isFetching - organizations not fetched - true', () => {
        const target = setup({},{1:1});
        expect(isFetching(target)).toBeTruthy();
    });

    it('isLoggedIn - all fetched - false', () => {
        const target = setup({},{1:1},{1:1});
        expect(isLoggedIn(target)).toBeFalsy();
    });
});