import { types } from "./types";

const initialState = {
  list: null,
};

export const catsReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case types.FILL_CATS:
      return {...state, list: payload};
    default:
      return state;
  };
};
