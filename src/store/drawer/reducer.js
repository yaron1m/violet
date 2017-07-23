import * as actionTypes from './action-types';


const initialState = {
    isOpen: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.CHANGE_DRAWER_STATE:
            return {
                isOpen: !state.isOpen,
            };

        default:
            return state;
    }
}

export function isDrawerOpen(state){
    return state.drawer.isOpen;
}