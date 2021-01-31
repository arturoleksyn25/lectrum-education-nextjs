import { types } from "./types";

const initialState = {
  news: []
};

export const newsReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case types.FILL_NEWS:
      return {...state, news: payload};
    default:
      return state;
  }
};
