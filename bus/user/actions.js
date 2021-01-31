import { types } from "./types";

export const userActions = {
  fillUser: (user) => {
    return {
      type: types.FILL_USER,
      payload: user
    }
  },
  setVisitCounts: (visit_count) => {
    return {
      type: types.SET_VISIT_COUNT,
      payload: visit_count
    }
  },
  setUserType: (user_type) => {
    return {
      type: types.SET_USER_TYPE,
      payload: user_type
    }
  }
};
