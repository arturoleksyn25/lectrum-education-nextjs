import { types } from "./types";

const initialState = {
  list: null,
};

export const asteroidsReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case types.FILL_ASTEROIDS:
      return {...state, list: payload};

    default:
      return state;
  }
};
