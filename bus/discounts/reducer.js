import { types } from "./types";

const initialState = {
  list: []
};

export const discountsReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case types.FILL_DISCOUNTS:
      return {...state, list: payload};
    default:
      return state;
  }
};
