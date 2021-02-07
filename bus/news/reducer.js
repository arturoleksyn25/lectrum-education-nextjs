import { types } from "./types";

const initialState = {
  list: []
};

export const newsReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case types.FILL_NEWS:
      return {...state, list: payload};
    default:
      return state;
  }
};
