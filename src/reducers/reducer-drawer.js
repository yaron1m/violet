import {CHANGE_DRAWER_STATE} from '../actions/action-drawer'

const initialState = {
    isOpen: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CHANGE_DRAWER_STATE:
            return {
                isOpen: !state.isOpen,
            };

        default:
            return state;
    }
}