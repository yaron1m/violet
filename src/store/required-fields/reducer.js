import * as actionTypes from "./action-types";
import Immutable from "seamless-immutable";
import requiredFields from "./required-fields";

export default (state = requiredFields, action = {}) => {

    switch (action.type) {
        case actionTypes.SHOW_REQUIRED_FIELDS:
            return Immutable.merge(state, {
                showRequiredFields: true,
            });

        case actionTypes.HIDE_REQUIRED_FIELDS:
            return Immutable.merge(state, {
                showRequiredFields: false,
            });

        default:
            return state
    }
}

export function getRequiredFieldsFromState(state) {
    return state.requiredFields;
}
