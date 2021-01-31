import { types } from "./types";

const initialState = {
  userId: null,
  visitCounts: 0,
  userType: null
};

export const userReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case types.FILL_USER:
      return {...state, ...payload};
    case types.SET_VISIT_COUNT:
      return {...state, visitCounts: payload};
    case types.SET_USER_TYPE:
      return {...state, userType: payload};
    default:
      return state;
  }
};
