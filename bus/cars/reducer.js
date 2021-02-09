import { types } from "./types";

const initialState = {
  list: []
};

export const carsReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case types.FILL_CARS:
      return {...state, list: payload};
    default:
      return state;
  }
};
