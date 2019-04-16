import { GET_CURRENT_USER, REGISTER } from "../actions";

// Action reducer for actions related to users
const currentUser = (state = {}, action) => {
    state = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case GET_CURRENT_USER:
            state = action.user;
            return state;
        case REGISTER:
            state.hasCompletedRegistration = true;
            return state;
        default:
            return state;
    }
};

export default currentUser;