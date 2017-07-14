import {
    SENT_TO_DATABASE, IS_SENDING_TO_DATABASE
} from "../actions/action-database";

const initialState = {
    isSending: false,
};

export default(state = initialState, action) => { //TODO needs fix
    switch (action.type) {
        case IS_SENDING_TO_DATABASE:
            return {
                isSending: true,
            };

        case SENT_TO_DATABASE:
            return {
                isSending: false,
                sendSuccessfully: action.payload
            };


        default:
            return state
    }
};
