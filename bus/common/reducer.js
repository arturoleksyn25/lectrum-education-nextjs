import { types } from "./types";

const initialState = {
  isLoading: true
};

export const commonReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case types.TOGGLE_IS_LOADING:
      return {...state, isLoading: payload};
    default:
      return state;
  }
};
