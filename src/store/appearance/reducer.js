import * as actionTypes from './action-types';
import * as Immutable from "seamless-immutable";

const initialState = Immutable({
    isOpen: false,
    rtl: true,
    language: "he",
});

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case actionTypes.CHANGE_DRAWER_STATE:
            return Immutable.merge(state, {
                isOpen: !state.isOpen,
            });

        case actionTypes.CHANGE_LANGUAGE:
            return Immutable.merge(state, {
                rtl: action.rtl,
                language: action.language,
            });

        default:
            return state;
    }
}

export function isDrawerOpen(state) {
    return state.appearance.isOpen;
}

export function isRTL(state){
    return state.appearance.rtl;
}

export function getLanguage(state){
    return state.appearance.language;
}